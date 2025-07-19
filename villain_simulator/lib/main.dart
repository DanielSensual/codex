import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'models/villain.dart';
import 'screens/home_screen.dart';
import 'screens/tutorial_screen.dart';

void main() => runApp(const VillainSimulatorApp());

class VillainSimulatorApp extends StatelessWidget {
  const VillainSimulatorApp({super.key});

  Future<bool> _firstRun() async {
    final prefs = await SharedPreferences.getInstance();
    final shown = prefs.getBool('tutorial_shown') ?? false;
    if (!shown) {
      await prefs.setBool('tutorial_shown', true);
    }
    return !shown;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Villain Simulator',
      theme: ThemeData.dark().copyWith(
        colorScheme: const ColorScheme.dark(
          primary: Colors.red,
          secondary: Colors.redAccent,
        ),
      ),
      home: FutureBuilder<bool>(
        future: _firstRun(),
        builder: (context, snapshot) {
          if (snapshot.connectionState != ConnectionState.done) {
            return const SizedBox.shrink();
          }
          if (snapshot.data == true) {
            return const TutorialScreen();
          }
          return const HomeScreen();
        },
      ),
    );
  }
}
