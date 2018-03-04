<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Note;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach(range(1, 10) as $index) {
            Note::create([
                'title'     => $faker->sentence(5),
                'content'   => $faker->paragraph(4)
            ]);
        }
    }
}
