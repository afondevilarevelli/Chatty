<?php

namespace App\Events;

use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewMessageEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  private User $user;
  public Message $message;

  /**
   * Create a new event instance.
   */
  public function __construct(User $user, Message $message)
  {
    $this->user = $user;
    $this->message = $message;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return [
      new PrivateChannel('NewMessage.' . $this->message->to),
    ];
  }

  public function broadcastAs(): string
  {
    return 'NewMessage.' . $this->message->to;
  }

  public function broadcastWhen(): bool
  {
    return $this->message->to == $this->user->id;
  }
}