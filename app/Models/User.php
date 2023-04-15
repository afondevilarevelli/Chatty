<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function sentMessages()
  {
    return $this->hasMany(Message::class, 'from');
  }

  public function receivedMessages()
  {
    return $this->hasMany(Message::class, 'to');
  }

  public function getChats($from = 0, $to = 10)
  {
    $chats = [];

    $chattingUsers = User::whereRelation('sentMessages', 'to', '=', $this->id)
      ->orWhereRelation('receivedMessages', 'from', '=', $this->id)->get();

    foreach ($chattingUsers as $user) {
      $chats[$user->id] = $this->getMessagesWithUser($user->id);
    }

    return ["chats" => $chats, "chattingUsers" => $chattingUsers];
  }

  private function getMessagesWithUser($userId)
  {
    return Message::where([['from', '=', $this->id], ['to', '=', $userId]])
      ->orWhere([['from', '=', $userId], ['to', '=', $this->id]])
      ->orderBy('created_at')
      ->get();
  }
}