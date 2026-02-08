# DevEvo Content Repository

This repository contains all learning content for the **DevEvo** mobile application - a comprehensive interview preparation app for developers.

## 📁 Repository Structure

```
devevo-content/
├── quiz/                    # Interview quiz questions
│   ├── meta.json           # Topics metadata
│   ├── architecture/       # System design questions
│   ├── backend/            # Backend (Node.js, SQL)
│   ├── devops/             # Docker & DevOps
│   ├── languages/          # Programming languages (JS, TS, CSS)
│   ├── mobile/             # React Native
│   ├── reactjs/            # React & Hooks
│   └── tools/              # Git commands
│
├── explore/                # Learning resources & guides
│   ├── meta.json          # Resources metadata
│   └── sources/           # Markdown content files
│       ├── git.md
│       ├── react.md
│       ├── javascript.md
│       ├── system-design-primer.md
│       ├── sql-cheat-sheet.md
│       ├── react-native-performance.md
│       ├── clean-code.md
│       ├── soft-skills.md
│       ├── html-basics.md
│       ├── html-forms.md
│       ├── html-seo.md
│       └── html-apis.md
│
└── videos/                # Video resources metadata
    └── meta.json         # Videos & categories
```

## 🎯 Content Types

### 1. Quiz Questions
- **Format**: JSON
- **Categories**: 10 topics (React, JavaScript, TypeScript, CSS, Git, React Native, System Design, Node.js, SQL, Docker)
- **Total Questions**: 178 questions
- **Structure**:
  ```json
  {
    "id": "unique-id",
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation",
    "difficulty": "easy|medium|hard",
    "tags": ["tag1", "tag2"]
  }
  ```

### 2. Explore Resources
- **Format**: Markdown
- **Categories**: Git, React, JavaScript, Architecture, Database, Mobile, Engineering, Career, HTML
- **Total Resources**: 12 comprehensive guides
- **Topics**: Best practices, cheat sheets, performance tips, interview guides

### 3. Videos
- **Format**: JSON metadata
- **Content**: YouTube video IDs with metadata
- **Categories**: Podcasts, Tutorials, Tech Talks, Courses
- **Total Videos**: 15 curated tech videos
- **Features**: Related quiz links, explore resource links, tag-based recommendations

## 🔗 Usage in App

The DevEvo mobile app fetches content from this repository via GitHub Raw URLs:

```
Base URL: https://raw.githubusercontent.com/andy-pham-it/devevo-content/main/

Examples:
- Quiz metadata: /quiz/meta.json
- Quiz questions: /quiz/languages/javascript.json
- Explore metadata: /explore/meta.json
- Explore content: /explore/sources/git.md
- Videos: /videos/meta.json
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding Quiz Questions

1. Navigate to the appropriate category folder in `quiz/`
2. Edit the JSON file following the structure above
3. Ensure:
   - Unique IDs
   - Clear, concise questions
   - Accurate correct answers
   - Helpful explanations
   - Appropriate difficulty level

### Adding/Updating Explore Resources

1. Create or edit markdown files in `explore/sources/`
2. Update `explore/meta.json` with new resource metadata
3. Follow markdown best practices:
   - Use proper headings (H1 for title, H2 for sections)
   - Include code examples with syntax highlighting
   - Keep content concise and practical

### Adding Videos

1. Edit `videos/meta.json`
2. Add video metadata:
   ```json
   {
     "id": "unique-id",
     "youtubeId": "YouTube-video-ID",
     "title": "Video title",
     "description": "Description",
     "author": "Channel name",
     "duration": "45m",
     "tags": ["React", "Hooks"],
     "category": "tutorial",
     "relatedQuizCategory": "react",
     "relatedExploreIds": ["react-best-practices"]
   }
   ```

### Contribution Workflow

1. Fork this repository
2. Create a feature branch: `git checkout -b add-new-content`
3. Make your changes
4. Run validation (see below)
5. Commit: `git commit -m "Add: New React quiz questions"`
6. Push: `git push origin add-new-content`
7. Create a Pull Request

## ✅ Validation

Before submitting a PR, ensure your content passes validation:

```bash
# Validate JSON files
find . -name "*.json" -exec node -e "JSON.parse(require('fs').readFileSync('{}', 'utf8'))" \;

# Check markdown files (requires markdownlint)
npm install -g markdownlint-cli
markdownlint 'explore/sources/**/*.md'
```

## 📊 Content Statistics

- **Quiz Questions**: 178 across 10 categories
- **Explore Guides**: 12 comprehensive resources
- **Videos**: 15 curated tech videos
- **Total Size**: ~78KB (will grow)
- **Last Updated**: 2026-02-08

## 📝 Content Guidelines

### Quiz Questions
- ✅ Focus on practical, interview-relevant questions
- ✅ Provide detailed explanations
- ✅ Include code examples when applicable
- ✅ Tag appropriately for searchability
- ❌ Avoid overly theoretical questions
- ❌ Don't duplicate existing questions

### Explore Resources
- ✅ Keep content up-to-date with latest best practices
- ✅ Include real-world examples
- ✅ Structure content with clear headings
- ✅ Add code snippets with proper syntax highlighting
- ❌ Avoid outdated patterns or deprecated APIs
- ❌ Don't copy-paste from other sources without attribution

### Videos
- ✅ Curate high-quality, educational content
- ✅ Link to related quizzes and resources
- ✅ Provide accurate duration and descriptions
- ✅ Tag appropriately for discovery
- ❌ Avoid promotional or low-quality videos
- ❌ Don't add videos without proper metadata

## 🔄 Update Frequency

Content is updated regularly:
- **Quiz Questions**: Added as new topics are identified
- **Explore Resources**: Updated when best practices evolve
- **Videos**: New videos added weekly

## 📜 License

This content is part of the DevEvo project and is provided for educational purposes.

## 🐛 Issues & Feedback

Found an error or have a suggestion?
- Open an issue in this repository
- Or contribute a fix via Pull Request

## 🙏 Acknowledgments

Content curated and maintained by the DevEvo team and community contributors.

---

**Happy Learning! 🚀**
