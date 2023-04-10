<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class NewMessageRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
   */
  public function rules(): array
  {
    return [
      'text' => 'required|max:500',
      'to' => 'required|exists:App\Models\User,id|different:id',
      'type' => 'in:text,image,document',
      'attachment' => 'file|nullable|required_unless:type,text'
    ];
  }
}