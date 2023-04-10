<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class MessageFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    $count = User::all()->count();
    $toSkipA = rand(0, $count - 1);
    $toSkipB = rand(0, $count - 1);
    while ($toSkipA == $toSkipB) {
      $toSkipB = rand(0, $count - 1);
    }

    $userA = User::all()->skip($toSkipA)->firstOrFail();
    $userB = User::all()->skip($toSkipB)->firstOrFail();

    return [
      'from' => $userA->id,
      'to' => $userB->id,
      'text' => fake()->text(),
      'type' => "text",
    ];
  }
}