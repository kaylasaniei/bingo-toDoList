import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const BOARD_SIZE = 5;

export default function BoardScreen() {
  // Each cell: { text: string, checked: boolean }
  const [cells, setCells] = useState<{ text: string; checked: boolean }[]>(
    Array(BOARD_SIZE * BOARD_SIZE).fill({ text: "", checked: false })
  );
  const [input, setInput] = useState("");

  // Add new item to the next empty cell
  const addItem = () => {
    const nextEmpty = cells.findIndex((cell) => cell.text === "");
    if (input.trim() && nextEmpty !== -1) {
      const newCells = [...cells];
      newCells[nextEmpty] = { text: input.trim(), checked: false };
      setCells(newCells);
      setInput("");
    }
  };

  // Toggle checked state
  const toggleCell = (idx: number) => {
    if (cells[idx].text === "") return; // Ignore empty cells
    const newCells = [...cells];
    newCells[idx].checked = !newCells[idx].checked;
    setCells(newCells);
  };

  const renderGrid = () => {
    let rows = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      let cols = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const idx = row * BOARD_SIZE + col;
        const cell = cells[idx];
        cols.push(
          <TouchableOpacity
            key={col}
            style={[
              styles.cell,
              cell.checked && styles.checkedCell,
              cell.text === "" && styles.emptyCell,
            ]}
            onPress={() => toggleCell(idx)}
            activeOpacity={cell.text === "" ? 1 : 0.7}
          >
            <Text style={styles.cellText}>{cell.text}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={row} style={styles.row}>
          {cols}
        </View>
      );
    }
    return rows;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bingo Board</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add a bingo item"
        />
        <Button title="Add" onPress={addItem} />
      </View>
          <View style={styles.board}>{renderGrid()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#25292e", padding: 20 },
  title: { color: "#fff", fontSize: 24, marginBottom: 20, textAlign: "center" },
  inputRow: { flexDirection: "row", marginBottom: 20 },
  input: { flex: 1, backgroundColor: "#fff", borderRadius: 5, padding: 10, marginRight: 10 },
  board: { alignItems: "center", justifyContent: "center" },
  row: { flexDirection: "row" },
  cell: {
    width: 55,
    height: 55,
    backgroundColor: "#393e4c",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    borderRadius: 8,
  },
  checkedCell: {
    backgroundColor: "#4caf50",
  },
  emptyCell: {
    backgroundColor: "#222",
  },
  cellText: { color: "#fff", textAlign: "center", fontSize: 12 },
});