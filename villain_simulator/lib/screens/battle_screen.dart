import 'package:flutter/material.dart';
import 'dart:math';

enum Power { strength, agility, tech }

class BattleScreen extends StatefulWidget {
  const BattleScreen({super.key});

  @override
  State<BattleScreen> createState() => _BattleScreenState();
}

class _BattleScreenState extends State<BattleScreen> {
  int wins = 0;
  int losses = 0;
  String? result;

  Power _randomHeroPower() {
    final values = Power.values;
    return values[Random().nextInt(values.length)];
  }

  String _powerToString(Power p) {
    switch (p) {
      case Power.strength:
        return 'Strength';
      case Power.agility:
        return 'Agility';
      case Power.tech:
        return 'Tech';
    }
  }

  bool _beats(Power a, Power b) {
    if (a == Power.strength && b == Power.agility) return true;
    if (a == Power.agility && b == Power.tech) return true;
    if (a == Power.tech && b == Power.strength) return true;
    return false;
  }

  void _battle(Power choice) {
    final hero = _randomHeroPower();
    final win = _beats(choice, hero);
    final draw = choice == hero;
    setState(() {
      if (draw) {
        result = 'Draw against ${_powerToString(hero)} hero!';
      } else if (win) {
        wins++;
        result = 'You win! Hero used ${_powerToString(hero)}';
      } else {
        losses++;
        result = 'You lost! Hero used ${_powerToString(hero)}';
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Battle Heroes')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            if (result != null) Text(result!),
            Text('Wins: $wins   Losses: $losses'),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: Power.values
                  .map((p) => ElevatedButton(
                        onPressed: () => _battle(p),
                        child: Text(_powerToString(p)),
                      ))
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}
