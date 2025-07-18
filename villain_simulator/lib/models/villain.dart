class Villain {
  String name;
  String backstory;
  List<String> powers;
  int dominationScore;

  Villain({
    required this.name,
    required this.backstory,
    required this.powers,
    this.dominationScore = 0,
  });
}
