<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    public function definition()
    {
        $ran = ["reçu","non reçu"];
        $type_courriel = ["archive","travail effectué"];
        return [
            'employe' => $this->faker->firstName(),
            'intérêt' => $this->faker->company(),
            'ubrique_envoyée' => $this->faker->domainName(),
            'destinataire' => $this->faker->domainWord(),
            'sujet' => $this->faker->sentence($nbWords = 6, $variableNbWords = true),
            'date' => $this->faker->date(),
            'type_courriel' => $type_courriel[array_rand($type_courriel, 1)],
            'datec' => $this->faker->date(),
            'datep' => $this->faker->date(),
            'type' => $ran[array_rand($ran, 1)]
        ];
    }
}
