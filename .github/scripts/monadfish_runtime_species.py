#!/usr/bin/env python3
from pathlib import Path
import sys

path = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/monadfish-upstream/dist/local-api-shim.js")
if not path.exists():
    raise SystemExit(f"local-api-shim not found: {path}")

text = path.read_text(encoding="utf-8")
old = """            const fish = [
              {id:'carp',chance:45.14,price:4,xp:5},
              {id:'perch',chance:28,price:8,xp:10},
              {id:'bream',chance:15,price:18,xp:18},
              {id:'catfish',chance:8,price:38,xp:25},
              {id:'goldfish',chance:3,price:100,xp:50},
              {id:'mutant',chance:.8,price:400,xp:100},
              {id:'pike',chance:.05,price:5000,xp:500},
              {id:'leviathan',chance:.01,price:25000,xp:5000},
            ];"""
new = """            const fish = [
              {id:'carp',chance:26,price:4,xp:5},
              {id:'perch',chance:18,price:8,xp:10},
              {id:'tilapia',chance:12,price:5,xp:6},
              {id:'trout',chance:10,price:11,xp:12},
              {id:'bass',chance:8,price:14,xp:14},
              {id:'bream',chance:8,price:18,xp:18},
              {id:'koi',chance:6,price:26,xp:22},
              {id:'eel',chance:4,price:34,xp:28},
              {id:'catfish',chance:4,price:38,xp:25},
              {id:'goldfish',chance:2.5,price:100,xp:50},
              {id:'tuna',chance:.8,price:75,xp:45},
              {id:'mutant',chance:.55,price:400,xp:100},
              {id:'pike',chance:.1,price:5000,xp:500},
              {id:'leviathan',chance:.05,price:25000,xp:5000},
            ];"""
if old not in text:
    raise SystemExit("Could not find original Lite fish table")
text = text.replace(old, new, 1)

old_rare = "['bream','catfish','goldfish','mutant','pike','leviathan']"
new_rare = "['bream','koi','eel','catfish','goldfish','tuna','mutant','pike','leviathan']"
if old_rare not in text:
    raise SystemExit("Could not find rare fish progress table")
text = text.replace(old_rare, new_rare)

path.write_text(text, encoding="utf-8")
print("runtime fish table expanded to 14 catchable species")
