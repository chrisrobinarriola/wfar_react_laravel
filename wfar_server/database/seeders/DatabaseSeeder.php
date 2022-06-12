<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@email.com',
            'role' => 'admin',
            'status' => 'active',
            'password' => Hash::make('password')
        ]);

        User::create([
            'name' => 'Chair',
            'username' => 'chair',
            'email' => 'chair@email.com',
            'role' => 'chair',
            'status' => 'active',
            'password' => Hash::make('password')
        ]);

        User::create([
            'name' => 'Faculty',
            'username' => 'faculty',
            'email' => 'faculty@email.com',
            'role' => 'faculty',
            'assigned_to' => 2,
            'status' => 'active',
            'password' => Hash::make('password')
        ]);
    }
}
