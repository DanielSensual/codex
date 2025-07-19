import 'package:flutter/material.dart';
import 'profile_screen.dart';
import 'scheme_screen.dart';
import 'battle_screen.dart';
import 'lair_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _index = 0;

  final _screens = const [
    ProfileScreen(),
    SchemeScreen(),
    BattleScreen(),
    LairScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_index],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _index,
        onTap: (i) => setState(() => _index = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
          BottomNavigationBarItem(icon: Icon(Icons.lightbulb), label: 'Schemes'),
          BottomNavigationBarItem(icon: Icon(Icons.flash_on), label: 'Battle'),
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Lair'),
        ],
      ),
    );
  }
}
