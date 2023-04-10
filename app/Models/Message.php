<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  use HasFactory;

  protected $fillable = [
    'from',
    'to',
    'text',
    'type',
    'attachment'
  ];

  public function from()
  {
    $this->belongsTo(User::class, 'from');
  }

  public function to()
  {
    $this->belongsTo(User::class, 'to');
  }
}