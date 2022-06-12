<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wfar extends Model
{
    use HasFactory;

    protected $fillable = [
        'week_number',
        'date_of_class',
        'subject',
        'course_year_section',
        'number_of_attendees',
        'meeting_link',
        'learning_activities'
    ];
}
