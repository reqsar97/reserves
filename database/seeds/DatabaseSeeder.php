<?php

use Illuminate\Database\Seeder;
use App\Table;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=1; $i <= 30 ; $i++) {
            # code...
            Table::create([
                "number" => $i,
                "area" => 1,
                "is_open" => 0
            ]);
        }
    }
}
