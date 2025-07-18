import 'package:flutter/material.dart';

class LairScreen extends StatefulWidget {
  const LairScreen({super.key});

  @override
  State<LairScreen> createState() => _LairScreenState();
}

class _LairScreenState extends State<LairScreen> {
  final List<Widget> _items = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Lair Builder')),
      body: Row(
        children: [
          Expanded(
            child: DragTarget<Widget>(
              builder: (context, candidate, rejected) {
                return Container(
                  color: Colors.grey[900],
                  child: Stack(children: _items),
                );
              },
              onAccept: (widget) {
                setState(() {
                  _items.add(Positioned(
                    left: 50.0 * _items.length,
                    top: 50.0 * _items.length,
                    child: widget,
                  ));
                });
              },
            ),
          ),
          SizedBox(
            width: 100,
            child: Column(
              children: [
                Draggable<Widget>(
                  data: const Icon(Icons.security, color: Colors.red),
                  feedback: const Icon(Icons.security, color: Colors.red, size: 32),
                  child: const Icon(Icons.security, color: Colors.red),
                ),
                const SizedBox(height: 16),
                Draggable<Widget>(
                  data: const Icon(Icons.android, color: Colors.green),
                  feedback: const Icon(Icons.android, color: Colors.green, size: 32),
                  child: const Icon(Icons.android, color: Colors.green),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
