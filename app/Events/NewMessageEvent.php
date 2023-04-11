<?php

namespace App\Events;

use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewMessageEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public Message $message;

  /**
   * Create a new event instance.
   */
  public function __construct(Message $message)
  {
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
      new PrivateChannel('user.messages.' . $this->message->to),
    ];
  }

  public function broadcastAs(): string
  {
    return 'NewMessage';
  }

  public function broadcastWith()
  {
    return [
      "from" => User::find($this->message->from),
      'text' => $this->message->text,
      'type' => $this->message->type,
      'attachment' => $this->message->attachment,
      'created_at' => $this->message->created_at,
    ];
  }
}