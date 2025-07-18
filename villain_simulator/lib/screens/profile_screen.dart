import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/villain.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _nameController = TextEditingController();
  final _backstoryController = TextEditingController();
  final _powerController = TextEditingController();
  List<String> powers = [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _nameController.text = prefs.getString('name') ?? '';
      _backstoryController.text = prefs.getString('backstory') ?? '';
      powers = prefs.getStringList('powers') ?? [];
    });
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('name', _nameController.text);
    await prefs.setString('backstory', _backstoryController.text);
    await prefs.setStringList('powers', powers);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Your Villain Profile')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Name'),
            ),
            TextField(
              controller: _backstoryController,
              decoration: const InputDecoration(labelText: 'Backstory'),
            ),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _powerController,
                    decoration: const InputDecoration(labelText: 'Add Power'),
                  ),
                ),
                IconButton(
                  onPressed: () {
                    setState(() {
                      powers.add(_powerController.text);
                      _powerController.clear();
                    });
                    _save();
                  },
                  icon: const Icon(Icons.add),
                ),
              ],
            ),
            Wrap(
              spacing: 8,
              children: [
                for (final power in powers)
                  Chip(
                    label: Text(power),
                    onDeleted: () {
                      setState(() => powers.remove(power));
                      _save();
                    },
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
