import 'package:flutter/material.dart';
import 'dart:math';

class SchemeScreen extends StatefulWidget {
  const SchemeScreen({super.key});

  @override
  State<SchemeScreen> createState() => _SchemeScreenState();
}

class _SchemeScreenState extends State<SchemeScreen> {
  final _plans = [
    'Steal the moon',
    'Hack global banks',
    'Unleash mind-control waves',
    'Kidnap world leaders',
  ];
  String? _currentPlan;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Plot Schemes')),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (_currentPlan != null) Text(_currentPlan!, textAlign: TextAlign.center),
            ElevatedButton(
              onPressed: () {
                final rand = Random();
                final twist = ['with lasers', 'while invisible', 'using robots'][rand.nextInt(3)];
                setState(() {
                  _currentPlan = '${_plans[rand.nextInt(_plans.length)]} $twist!';
                });
              },
              child: const Text('Generate Evil Plan'),
            ),
          ],
        ),
      ),
    );
  }
}
