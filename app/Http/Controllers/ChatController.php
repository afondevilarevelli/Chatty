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

    ['chats' => $chats, 'chattingUsers' => $chattingUsers] = $user->getChats();
    $restOfUsers = User::whereNotIn('id', [...array_keys($chats), $user->id])->get();

    return Inertia::render('Chats/Index', [
      'chats' => $chats,
      'chattingUsers' => $chattingUsers,
      'users' => $restOfUsers
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

    $createdMessage = $createdMessage->load(["from", "to"]);

    return ["message" => $createdMessage];
  }
}