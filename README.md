# Chatbot Flow Builder

A functional, extensible Chatbot Flow Builder built with React and React Flow.

## Features

- **Drag & Drop Interface**: Drag nodes from the sidebar to create flow diagrams
- **Custom Text Nodes**: Editable text message nodes with proper handles
- **Real-time Editing**: Click nodes to edit their content in the sidebar
- **Flow Validation**: Validates that flows have proper structure before saving
- **Extensible Design**: Easy to add new node types and features

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Use

1. **Adding Nodes**: Drag "Text Message" nodes from the sidebar onto the canvas
2. **Connecting Nodes**: Click and drag from the bottom handle of one node to the top handle of another
3. **Editing Nodes**: Click on any node to select it, then edit the text in the settings panel
4. **Saving Flow**: Click "Save Flow" to validate and save your chatbot flow
5. **Clearing Selection**: Click "Clear Selection" to deselect nodes

## Project Structure

```
src/
├── App.js                 # Root component with validation logic
├── components/
│   ├── FlowBuilder.js     # React Flow canvas and handlers
│   ├── TextNode.js        # Custom node component
│   └── Sidebar.js         # Nodes panel and settings panel
└── index.js               # App entry point
```

## Validation Rules

The flow validation ensures:
- If there are multiple nodes, only one node can have an empty source handle (end node)
- This prevents multiple conversation endpoints in a single flow

