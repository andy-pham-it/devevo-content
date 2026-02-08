# Contributing to DevEvo Content

Thank you for your interest in contributing to DevEvo! This document provides guidelines for contributing content to the repository.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Content Guidelines](#content-guidelines)
- [Submission Process](#submission-process)
- [Quality Standards](#quality-standards)

## 🤝 Code of Conduct

- Be respectful and constructive
- Focus on educational value
- Ensure accuracy of technical content
- Give credit where credit is due

## 🚀 How to Contribute

### 1. Fork the Repository

Click the "Fork" button at the top right of this repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/devevo-content.git
cd devevo-content
```

### 3. Create a Branch

```bash
git checkout -b feature/add-new-content
```

### 4. Make Your Changes

Follow the content guidelines below for the type of content you're adding.

### 5. Test Your Changes

```bash
# Validate JSON files
find . -name "*.json" -exec node -e "JSON.parse(require('fs').readFileSync('{}', 'utf8'))" \;

# Lint markdown files (optional, requires markdownlint-cli)
markdownlint 'explore/sources/**/*.md'
```

### 6. Commit Your Changes

```bash
git add .
git commit -m "Add: New React quiz questions"
```

Use clear commit messages:
- `Add:` for new content
- `Update:` for modifications
- `Fix:` for corrections
- `Remove:` for deletions

### 7. Push to Your Fork

```bash
git push origin feature/add-new-content
```

### 8. Create a Pull Request

Go to the original repository and click "New Pull Request".

## 📝 Content Guidelines

### Quiz Questions

**File Location**: `quiz/[category]/[topic].json`

**Structure**:
```json
{
  "id": "unique-id-here",
  "question": "What is the purpose of useEffect in React?",
  "options": [
    "To manage component state",
    "To perform side effects in function components",
    "To create custom hooks",
    "To optimize rendering performance"
  ],
  "correctAnswer": 1,
  "explanation": "useEffect is used to perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.",
  "difficulty": "medium",
  "tags": ["react", "hooks", "useEffect"]
}
```

**Requirements**:
- ✅ Unique ID (use format: `topic-number`, e.g., `react-hooks-15`)
- ✅ Clear, concise question
- ✅ 2-4 options (typically 4 for multiple choice)
- ✅ Correct answer index (0-based)
- ✅ Detailed explanation
- ✅ Appropriate difficulty: `easy`, `medium`, or `hard`
- ✅ Relevant tags for searchability

**Don't**:
- ❌ Copy questions from other sources without attribution
- ❌ Use ambiguous or trick questions
- ❌ Include outdated information
- ❌ Create duplicate questions

### Explore Resources

**File Location**: `explore/sources/[topic].md`

**Structure**:
```markdown
# Title

Brief introduction paragraph.

## Section 1

Content with examples...

### Subsection

More detailed content...

\`\`\`javascript
// Code example
const example = 'with syntax highlighting';
\`\`\`

## Section 2

...
```

**Requirements**:
- ✅ Clear H1 title
- ✅ Logical section hierarchy (H2, H3)
- ✅ Code examples with syntax highlighting
- ✅ Practical, actionable content
- ✅ Up-to-date best practices
- ✅ Proper markdown formatting

**Don't**:
- ❌ Use deprecated patterns
- ❌ Include excessive theory without examples
- ❌ Copy large blocks from other sources
- ❌ Use poor formatting

**After creating a markdown file**, update `explore/meta.json`:
```json
{
  "id": "unique-id",
  "uuid": "generate-uuid-v4",
  "title": "Resource Title",
  "description": "Brief description",
  "icon": "ionicons-name",
  "category": "Category Name",
  "filePath": "sources/filename.md"
}
```

### Videos

**File Location**: `videos/meta.json`

**Structure**:
```json
{
  "id": "unique-id",
  "youtubeId": "dQw4w9WgXcQ",
  "title": "Video Title",
  "description": "Detailed description of what the video covers",
  "author": "Channel Name",
  "authorChannel": "channel-handle",
  "duration": "45m",
  "tags": ["React", "Hooks", "Tutorial"],
  "category": "tutorial",
  "relatedQuizCategory": "react",
  "relatedExploreIds": ["react-best-practices"]
}
```

**Requirements**:
- ✅ Valid YouTube video ID
- ✅ Accurate title and description
- ✅ Correct duration format (e.g., "45m", "1h 20m")
- ✅ Relevant tags
- ✅ Appropriate category: `podcast`, `tutorial`, `talk`, or `course`
- ✅ Link to related quiz/explore content when applicable

**Don't**:
- ❌ Add promotional or low-quality videos
- ❌ Include videos with incorrect metadata
- ❌ Add videos without proper categorization

## ✅ Quality Standards

### All Content Must:

1. **Be Accurate**: Verify all technical information
2. **Be Original**: Don't plagiarize; give credit for sources
3. **Be Clear**: Use simple, understandable language
4. **Be Current**: Use up-to-date information and best practices
5. **Be Tested**: Verify code examples work
6. **Be Formatted**: Follow the structure guidelines

### Review Checklist

Before submitting, ensure:

- [ ] Content is accurate and tested
- [ ] JSON files are valid (run validation)
- [ ] Markdown is properly formatted
- [ ] No spelling or grammar errors
- [ ] Code examples have syntax highlighting
- [ ] Metadata files are updated (if applicable)
- [ ] Commit messages are clear
- [ ] No sensitive information included

## 🔍 Review Process

1. **Automated Checks**: GitHub Actions will validate your content
2. **Manual Review**: Maintainers will review for quality and accuracy
3. **Feedback**: You may receive comments or change requests
4. **Merge**: Once approved, your contribution will be merged

## 📊 Content Priorities

We especially welcome contributions in these areas:

- **High Priority**:
  - Advanced React patterns
  - System design case studies
  - Real interview questions
  - Performance optimization guides

- **Medium Priority**:
  - Framework-specific content (Next.js, Vue, Angular)
  - Backend technologies (GraphQL, Microservices)
  - DevOps and CI/CD

- **Low Priority**:
  - Basic syntax tutorials (already well-covered)
  - Deprecated technologies

## 💬 Questions?

- Open an issue for questions about contributing
- Check existing issues and PRs for similar contributions
- Reach out to maintainers if you need guidance

## 🎉 Recognition

All contributors will be acknowledged in the project. Thank you for helping make DevEvo better!

---

**Happy Contributing! 🚀**
