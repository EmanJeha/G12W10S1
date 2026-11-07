/* Questions for both games. Edit text here; keep the structure.
   Question types:
     mc    – multiple choice (options + answer index)
     order – tap tiles into the right order
     line  – tap a line (here: the line of code that does a job)
     bins  – sort each item into one of two (or three) groups
   Any question can have its own "seconds". */
window.SITE_INFO = {
 "badge": "Grade 12 · Unit 4 · Week 10 · Session 1",
 "titleText": "Connection Games",
 "warmup": {
  "label": "Warm-up",
  "sub": "Guess today’s topic"
 },
 "wrapup": {
  "label": "Wrap-up",
  "sub": "Connect every node"
 },
 "titleHTML": "<span class=\"c1\">C</span><span class=\"c2\">o</span><span class=\"c3\">n</span><span class=\"c4\">n</span><span class=\"c5\">e</span><span class=\"c1\">c</span><span class=\"c2\">t</span><span class=\"c3\">i</span><span class=\"c4\">o</span><span class=\"c5\">n</span><br><span class=\"c1\">G</span><span class=\"c2\">a</span><span class=\"c3\">m</span><span class=\"c4\">e</span><span class=\"c5\">s</span>"
};
window.GAMES = {
 "warmup": {
  "badge": "Unit 4 · Week 10 · Session 1 · Warm-up",
  "name": "Line or Web?",
  "titleHTML": "<span class=\"c1\">L</span><span class=\"c2\">i</span><span class=\"c3\">n</span><span class=\"c4\">e</span><br><span class=\"c5\">o</span><span class=\"c1\">r</span> <span class=\"c2\">W</span><span class=\"c3\">e</span><span class=\"c4\">b</span><span class=\"c5\">?</span>",
  "intro": "A queue, a family tree, a road map… some things follow ONE path, others branch out in many directions. Every correct answer flips letters of today’s mystery topic. Crack it for +200!",
  "rules": [
   "Play on your own device (or with your breakout partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Crack the topic early: +200",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 40,
  "points": 100,
  "floaters": [
   "🕸️",
   "➡️",
   "🌳",
   "🗺️",
   "👥",
   "🔗",
   "📍",
   "🧩"
  ],
  "topic": "Complex Data Connections",
  "mystery": {
   "label": "Today’s mystery topic",
   "phrase": "COMPLEX DATA CONNECTIONS",
   "order": [
    2,
    20,
    6,
    22,
    1,
    21,
    16,
    23,
    3,
    10,
    15,
    11,
    19,
    8,
    5,
    0,
    14,
    4,
    13,
    18,
    9,
    17
   ],
   "perCorrect": 3,
   "bonus": 200,
   "accept": [
    "complex data connections",
    "complex data connection",
    "data connections",
    "complex connections",
    "non-linear data structures",
    "nonlinear data structures",
    "non linear data structures"
   ],
   "finalQ": "Put all the clues together. What is today’s topic?",
   "finalOptions": [
    "Binary Search",
    "Complex Data Connections",
    "Introduction to Databases",
    "Sorting Algorithms"
   ],
   "finalAnswer": 1,
   "finalWhy": "Every clue was about things that connect in more than one way. Today we explore complex (non-linear) data connections."
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "Canteen queue",
    "skill": "Understand",
    "q": "Students wait in the canteen queue. Is that ONE path (a line) or MANY connections (a web)?",
    "options": [
     "A line: one predictable path",
     "A web: many connections"
    ],
    "answer": 0,
    "why": "Each student is behind exactly one other student. One path, one order: a LINE."
   },
   {
    "type": "bins",
    "ctx": "Sort it",
    "skill": "Analyze",
    "seconds": 55,
    "q": "LINE or WEB? Sort each example.",
    "bins": [
     "➡️ Line",
     "🕸️ Web"
    ],
    "items": [
     {
      "t": "Playlist of songs",
      "b": 0
     },
     {
      "t": "Friends on social media",
      "b": 1
     },
     {
      "t": "Daily to-do list",
      "b": 0
     },
     {
      "t": "Road map between cities",
      "b": 1
     }
    ],
    "why": "Playlists and to-do lists follow one order. Friends and roads connect in many directions."
   },
   {
    "type": "mc",
    "ctx": "Family tree",
    "skill": "Understand",
    "q": "A family tree starts with grandparents and BRANCHES to children and grandchildren. What is it?",
    "options": [
     "A line",
     "A web that branches",
     "A single list",
     "Nothing connected"
    ],
    "answer": 1,
    "why": "It branches into many levels, so it is non-linear (a web/tree), not a straight line."
   },
   {
    "type": "mc",
    "ctx": "Most connected",
    "skill": "Analyze",
    "q": "In a connection web, Sara links to 5 people, Omar to 2 and Lina to 1. Who is the most connected?",
    "scene": "<span class=\"chip\" style=\"background:#5B5BF0\">Sara · 5</span><span class=\"chip\" style=\"background:#12B886\">Omar · 2</span><span class=\"chip\" style=\"background:#FF5D73\">Lina · 1</span>",
    "options": [
     "Lina",
     "Omar",
     "Sara",
     "They are all equal"
    ],
    "answer": 2,
    "why": "Sara has the most links (5). In a web, some items connect to many others."
   },
   {
    "type": "order",
    "ctx": "Playlist",
    "skill": "Apply",
    "seconds": 45,
    "q": "A playlist plays songs ONE after another. Put the songs in playing order.",
    "sub": "Tap the tiles in order.",
    "tiles": [
     "Song 3",
     "Song 1",
     "Song 4",
     "Song 2"
    ],
    "answer": [
     "Song 1",
     "Song 2",
     "Song 3",
     "Song 4"
    ],
    "why": "A line has a clear first, next and last. You can visit every item in one pass."
   },
   {
    "type": "mc",
    "ctx": "Road map",
    "skill": "Analyze",
    "q": "How many different routes can a road map have between two cities?",
    "options": [
     "Exactly one",
     "Never more than two",
     "Often many routes",
     "Zero"
    ],
    "answer": 2,
    "why": "Roads branch and connect, so there are often many paths to the same place. That is a web."
   },
   {
    "type": "mc",
    "ctx": "Real life",
    "skill": "Evaluate",
    "q": "Real life is often a WEB. What do computers need to store web-like data?",
    "options": [
     "Only straight lists",
     "Data structures that can branch and connect",
     "Bigger screens",
     "Faster keyboards"
    ],
    "answer": 1,
    "why": "Non-linear data structures (trees and graphs) can branch and connect like real life."
   }
  ],
  "endHTML": "<div class=\"reveal\"><span class=\"pill\">Today's topic</span><div class=\"big\">Complex Data Connections</div><p class=\"lede\">When data branches and connects in many ways.</p></div>\n<div class=\"recap\"><div><b>Line</b>One path, one order</div><div><b>Web</b>Branches and connects</div><div><b>Non-linear</b>Trees and graphs</div></div>"
 },
 "wrapup": {
  "badge": "Unit 4 · Week 10 · Session 1 · Wrap-up",
  "name": "Web Quest",
  "titleHTML": "<span class=\"c1\">W</span><span class=\"c2\">e</span><span class=\"c3\">b</span><br><span class=\"c4\">Q</span><span class=\"c5\">u</span><span class=\"c1\">e</span><span class=\"c2\">s</span><span class=\"c3\">t</span>",
  "intro": "Ten challenges on data structures: sort linear and non-linear, spot the cycle, read the Python code and fix the challenges. Connect every node!",
  "rules": [
   "Play on your own device (or with your breakout partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Sort cards, order tiles and tap code lines",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 45,
  "points": 100,
  "floaters": [
   "🕸️",
   "🌳",
   "➡️",
   "🔗",
   "📍",
   "♻️",
   "🐍",
   "✓"
  ],
  "topic": "Complex Data Connections",
  "exit": {
   "q": "What is the difference between a linear and a non-linear data structure? Give ONE real-life example of each.",
   "placeholder": "Linear means…",
   "model": "In a linear structure elements sit in one straight order, so one pass visits them all (e.g. a canteen queue or a playlist). In a non-linear structure each element can connect to many others and you cannot visit them all in one pass (e.g. a road map, a family tree or friends on social media)."
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "Data structure",
    "skill": "Remember",
    "q": "What is a data structure?",
    "options": [
     "A way to organize and store data so it can be used easily and efficiently",
     "A type of computer screen",
     "A programming language",
     "A drawing of a city"
    ],
    "answer": 0,
    "why": "A data structure organizes and stores data so we can find and change it quickly."
   },
   {
    "type": "mc",
    "ctx": "Primitive",
    "skill": "Remember",
    "q": "Which of these stores a simple piece of information, like a game score?",
    "options": [
     "Tree",
     "Integer",
     "Graph",
     "Social network"
    ],
    "answer": 1,
    "why": "An integer is a primitive data structure: one simple value such as an age, a score or a price."
   },
   {
    "type": "bins",
    "ctx": "Linear or not",
    "skill": "Analyze",
    "seconds": 55,
    "q": "Sort each data structure.",
    "bins": [
     "➡️ Linear",
     "🕸️ Non-linear"
    ],
    "items": [
     {
      "t": "Array",
      "b": 0
     },
     {
      "t": "Tree",
      "b": 1
     },
     {
      "t": "Queue",
      "b": 0
     },
     {
      "t": "Graph",
      "b": 1
     },
     {
      "t": "Stack",
      "b": 0
     },
     {
      "t": "Linked list",
      "b": 0
     }
    ],
    "why": "Array, stack, queue and linked list are linear. Trees and graphs are non-linear."
   },
   {
    "type": "mc",
    "ctx": "Real life",
    "skill": "Apply",
    "q": "Which real-life example is best modeled by a non-linear structure?",
    "options": [
     "Songs in a playlist",
     "People waiting in a line",
     "Roads linking many cities",
     "A daily to-do list"
    ],
    "answer": 2,
    "why": "Cities joined by roads have many routes to the same place: a branching network."
   },
   {
    "type": "mc",
    "ctx": "Cycles",
    "skill": "Understand",
    "q": "What can happen when elements form a loop (a cycle)?",
    "options": [
     "Data sorts itself",
     "Memory use drops",
     "Infinite loops or crashes",
     "Nothing at all"
    ],
    "answer": 2,
    "why": "Cycles can send a program around forever. Check for loops before linking."
   },
   {
    "type": "mc",
    "ctx": "Traversal",
    "skill": "Evaluate",
    "q": "Which statement is TRUE?",
    "options": [
     "Non-linear is always simpler to build",
     "Linear data can be visited in a single pass",
     "Linear elements connect to many others",
     "Non-linear uses less memory"
    ],
    "answer": 1,
    "why": "Linear elements sit in one order, so one pass visits them all."
   },
   {
    "type": "bins",
    "ctx": "Problem → fix",
    "skill": "Analyze",
    "seconds": 55,
    "q": "Is this a PROBLEM or a FIX for non-linear structures?",
    "bins": [
     "⚠️ Problem",
     "🛠️ Fix"
    ],
    "items": [
     {
      "t": "Every connection takes extra memory",
      "b": 0
     },
     {
      "t": "Test small parts separately",
      "b": 1
     },
     {
      "t": "Check for loops before linking",
      "b": 1
     },
     {
      "t": "One error spreads across connections",
      "b": 0
     }
    ],
    "why": "Extra memory and spreading errors are the costs. Testing small parts and checking for loops are the fixes."
   },
   {
    "type": "mc",
    "ctx": "Matplotlib",
    "skill": "Understand",
    "q": "In the Matplotlib program, what do the arrows between circles show?",
    "options": [
     "The size of each city",
     "Direct connections between cities",
     "Alphabetical order",
     "Primitive data types"
    ],
    "answer": 1,
    "why": "Each circle is a city (a node); each two-way arrow is a direct connection."
   },
   {
    "type": "line",
    "ctx": "Read the code",
    "skill": "Analyze",
    "q": "Tap the line that lists the LINKS between the cities.",
    "code": [
     "import matplotlib.pyplot as plt",
     "positions = {\"New York\": (1, -1), ...}",
     "connections = [(\"New York\", \"Chicago\"), ...]",
     "plt.scatter(x, y, s=4000)",
     "plt.show()"
    ],
    "answer": 2,
    "why": "connections is a list of pairs: every pair is one link (an edge) between two cities."
   },
   {
    "type": "order",
    "ctx": "Setup",
    "skill": "Apply",
    "seconds": 50,
    "q": "Put the steps for drawing the city graph in order.",
    "sub": "Tap the tiles in order.",
    "tiles": [
     "Run the program",
     "pip install matplotlib",
     "Draw circles and arrows",
     "Write the cities and links"
    ],
    "answer": [
     "pip install matplotlib",
     "Write the cities and links",
     "Draw circles and arrows",
     "Run the program"
    ],
    "why": "Install the library → describe the data → draw it → run and see the triangle."
   }
  ],
  "endHTML": "<div class=\"recap\"><div><b>Linear</b>Array · stack · queue · linked list</div><div><b>Non-linear</b>Trees and graphs that branch</div><div><b>The cost</b>Memory · debugging · cycles</div></div>"
 }
};
