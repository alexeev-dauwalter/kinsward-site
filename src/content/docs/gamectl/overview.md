---
title: Overview
description: What is kinswardctl and how to use it
---

**kinswardctl** is a command-line tool for controlling a running Kinsward game instance over TCP. It connects to the game's built-in debug server and lets you query state, move the player, manage units, modify the world, and automate gameplay.

## Why kinswardctl?

- **Debugging** — inspect world state, block properties, unit positions
- **Automation** — script bulk operations (zone build/demolish, waypoint routes)
- **AI agents** — programmatic game control via TCP protocol
- **Testing** — reproduce scenarios with specific seeds and commands

## Requirements

The game must be running with the debug server enabled (it is on by default in standard builds). The TCP server listens on `127.0.0.1:9999`.

```bash
# Start the game (debug server is on by default)
./kinsward

# Or explicitly enable debug mode
./kinsward --debug
```

## Running kinswardctl

The `kinswardctl` binary is included alongside the game:

```bash
kinswardctl <command>
```

## Global Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--host <HOST>` | Server hostname | `127.0.0.1` |
| `--port <PORT>` | Server port | `9999` |
| `--json` | Output raw JSON responses | off |

```bash
# Connect to a different host/port
kinswardctl --host 192.168.1.100 --port 9999 state

# Get raw JSON output
kinswardctl --json state
```

## TCP Protocol

Under the hood, kinswardctl sends JSON commands over TCP. Each command is a single JSON line:

```json
{"cmd": "Ping"}
```

Responses follow this format:

```json
{"id": 1, "ok": true, "data": {...}}
{"id": 2, "ok": false, "data": null, "error": "message"}
```

You can test the connection directly:

```bash
echo '{"cmd":"Ping"}' | nc -q1 127.0.0.1 9999
```

See the [Commands Reference](/gamectl/commands/) for the full list, or [Examples](/gamectl/examples/) for practical workflows.
