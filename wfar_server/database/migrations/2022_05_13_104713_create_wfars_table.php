<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wfars', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->integer('week_number');
            $table->string('date_of_class');
            $table->string('course_year_section');
            $table->integer('number_of_attendees');
            $table->text('meeting_link');
            $table->text('learning_activities');
            $table->text('other_details');
            $table->string('status')->nullable();
            $table->string('added_by')->nullable();
            $table->longtext('attachment_1')->nullable();
            $table->longtext('attachment_2')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wfars');
    }
};
