<?php

namespace App\Http\Controllers;

use App\Events\NewMessageEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\NewMessageRequest;
use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
  public function index()
  {
    $user = Auth::user();

    $chats = $user->getChats();
    $chattingUsers = User::whereIn('id', array_keys($chats))->get();

    return Inertia::render('Chats/Index', [
      'chats' => $chats,
      'chattingUsers' => $chattingUsers
    ]);
  }

  public function newMessage(NewMessageRequest $newMessageRequest)
  {

    $userId = Auth::id();

    $createdMessage = Message::create([
      ...$newMessageRequest->validationData(),
      "from" => $userId,
    ]);

    NewMessageEvent::dispatch($createdMessage);

    return ["message" => $createdMessage];
  }
}