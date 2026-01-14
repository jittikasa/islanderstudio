# DINI PETTY PROJECT - COMPREHENSIVE IMPLEMENTATION BRIEF

**Date:** 2026-01-10
**Author:** Claude Code
**Status:** Implementation Ready
**Priority:** HIGH - Zero Manual Work Required

---

## EXECUTIVE SUMMARY

### What Was Requested
"I want you to do ALL the work. Use GitHub as database. Link directly to website. NO manual updates. NO plugin upload bullshit."

### What Was Delivered (Current State)
- ✅ GitHub as data source
- ✅ WordPress fetches from GitHub
- ❌ **User still runs 3 manual commands** ← CRITICAL FAILURE
- ❌ **User manually converts Excel** ← CRITICAL FAILURE
- ❌ **User manually pushes to Git** ← CRITICAL FAILURE

### What Must Be Built
**TRUE AUTOMATION:** User saves Excel file → System does everything else → Website updates

**Zero Manual Work = Zero Commands = Zero Technical Knowledge Required**

---

## PART 1: PROBLEM ANALYSIS

### Current Workflow (BROKEN)

```
User saves Excel file
    ↓ (MANUAL)
User runs: python3 scripts/excel-to-json.py file.xlsx
    ↓ (MANUAL)
User runs: git add data/guests.json && git commit -m "Update" && git push
    ↓ (AUTOMATIC - GOOD)
WordPress syncs from GitHub
    ↓ (AUTOMATIC - GOOD)
Website displays updated data
```

**Manual Steps:** 3
**Technical Knowledge:** High
**Grade:** C+ (Semi-automated)

---

### Target Workflow (CORRECT)

```
User saves Excel file to ~/Documents/DiniPetty/
    ↓ (AUTOMATIC)
LaunchAgent detects file change
    ↓ (AUTOMATIC)
Auto-sync script converts Excel → JSON
    ↓ (AUTOMATIC)
Auto-sync script commits to Git
    ↓ (AUTOMATIC)
Auto-sync script pushes to GitHub
    ↓ (AUTOMATIC)
WordPress syncs from GitHub
    ↓ (AUTOMATIC)
Website displays updated data
```

**Manual Steps:** 1 (save file)
**Technical Knowledge:** Zero
**Grade:** A+ (Fully automated)

---

## PART 2: ARCHITECTURE (INSPIRED BY ISLANDER STUDIO)

### Islander Studio Automation Patterns to Apply

#### Pattern 1: Git-Based Auto-Deployment
**Islander Studio:**
- Push to GitHub → Cloudflare Pages auto-builds → Website updates
- Zero manual deployment commands
- Preview deployments for branches

**Apply to Dini Petty:**
- Save Excel → Auto-push to GitHub → WordPress auto-syncs → Website updates
- Zero manual git commands
- File watcher triggers automation

#### Pattern 2: Edge-First Serverless
**Islander Studio:**
- Cloudflare Workers (serverless backend)
- No server management
- Pay per use (free tier generous)

**Apply to Dini Petty:**
- Cloudflare Workers for plugin updates (Phase 2)
- GitHub Actions for server-side Excel conversion (Alternative approach)
- No WordPress plugin uploads

#### Pattern 3: Integrated Asset Pipeline
**Islander Studio:**
- Upload image → R2 storage → Metadata in D1 → Serve via CDN
- All automated through API

**Apply to Dini Petty:**
- Save Excel → Convert → Store in GitHub → WordPress fetches → Display
- All automated through file watcher

#### Pattern 4: Documentation-Driven Setup
**Islander Studio:**
- Comprehensive DEPLOYMENT.md
- Step-by-step guides
- Troubleshooting sections

**Apply to Dini Petty:**
- One-command installer
- Visual setup guide
- Troubleshooting flowchart

---

### Complete System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         USER'S MAC                                │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ~/Documents/DiniPetty/                                     │  │
│  │    └── guests.xlsx                                          │  │
│  │                                                              │  │
│  │  USER ACTION: Save Excel file (Cmd+S)                       │  │
│  └────────────────────────┬───────────────────────────────────┘  │
│                            │                                       │
│                            │ File change detected (fswatch)        │
│                            │                                       │
│  ┌────────────────────────▼───────────────────────────────────┐  │
│  │  LaunchAgent: com.dinipetty.autocommit                      │  │
│  │  ~/Library/LaunchAgents/com.dinipetty.autocommit.plist      │  │
│  │                                                              │  │
│  │  Monitors: ~/Documents/DiniPetty/*.xlsx                     │  │
│  │  Triggers: ~/scripts/auto-sync.sh on change                 │  │
│  └────────────────────────┬───────────────────────────────────┘  │
│                            │                                       │
│                            │ Execute script                        │
│                            │                                       │
│  ┌────────────────────────▼───────────────────────────────────┐  │
│  │  Auto-Sync Script: ~/scripts/auto-sync.sh                   │  │
│  │                                                              │  │
│  │  Step 1: Find latest .xlsx file in watch directory          │  │
│  │  Step 2: Run conversion script                              │  │
│  │  Step 3: Check for changes (git diff)                       │  │
│  │  Step 4: Git add + commit + push (if changed)               │  │
│  │  Step 5: Log success/failure                                │  │
│  │  Step 6: Send notification (optional)                       │  │
│  └────────────────────────┬───────────────────────────────────┘  │
│                            │                                       │
└────────────────────────────┼───────────────────────────────────────┘
                             │
                             │ HTTPS Push
                             │
┌────────────────────────────▼───────────────────────────────────┐
│                         GITHUB                                  │
│                                                                  │
│  Repository: jittikasa/dini.petty                               │
│  Branch: main                                                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  data/guests.json                                         │  │
│  │  - Version controlled                                     │  │
│  │  - Public read access                                     │  │
│  │  - Auto-updated by LaunchAgent                            │  │
│  │  - History preserved                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Optional: GitHub Actions (Phase 3)                             │
│  - Validate JSON on push                                        │
│  - Create release on major changes                              │
│  - Notify WordPress of update                                   │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             │ HTTPS GET (every 1 hour)
                             │
┌────────────────────────────▼───────────────────────────────────┐
│                       WORDPRESS                                 │
│                                                                  │
│  Site: dinipetty.com                                            │
│  Hosting: Managed WordPress                                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Plugin: Dini Petty Archives                              │  │
│  │  Version: Auto-updating (Phase 2)                         │  │
│  │                                                             │  │
│  │  Functions:                                                 │  │
│  │  1. Fetch data/guests.json from GitHub                     │  │
│  │  2. Cache for 1 hour (transient API)                       │  │
│  │  3. Serve via REST API endpoint                            │  │
│  │  4. Provide search interface                               │  │
│  │  5. Auto-update plugin from GitHub (Phase 2)               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             │ Display
                             │
┌────────────────────────────▼───────────────────────────────────┐
│                   WEBSITE VISITORS                              │
│                                                                  │
│  - View guest archives                                          │
│  - Search by name, year, topic                                  │
│  - Filter and sort                                              │
│  - Always see latest data (1 hour cache)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## PART 3: DETAILED IMPLEMENTATION PLAN

### Phase 1: Core Automation (CRITICAL - Week 1)

#### Task 1.1: Create Auto-Sync Script
**File:** `scripts/auto-sync.sh`

```bash
#!/bin/bash
# Auto-Sync Script for Dini Petty Archives
# Converts Excel to JSON and pushes to GitHub automatically

set -e  # Exit on error

# Configuration
WATCH_DIR="$HOME/Documents/DiniPetty"
REPO_DIR="$HOME/Downloads/dini.petty"
LOG_FILE="$HOME/.dinipetty/sync.log"
CONVERSION_SCRIPT="$REPO_DIR/scripts/excel-to-json.py"

# Create log directory
mkdir -p "$HOME/.dinipetty"

# Log function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=== Auto-sync triggered ==="

# Check if watch directory exists
if [ ! -d "$WATCH_DIR" ]; then
    log "ERROR: Watch directory not found: $WATCH_DIR"
    exit 1
fi

# Find the most recent Excel file
EXCEL_FILE=$(find "$WATCH_DIR" -name "*.xlsx" -type f -print0 | xargs -0 ls -t | head -n 1)

if [ -z "$EXCEL_FILE" ]; then
    log "ERROR: No Excel file found in $WATCH_DIR"
    exit 1
fi

log "Found Excel file: $EXCEL_FILE"

# Change to repo directory
cd "$REPO_DIR" || exit 1

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    log "ERROR: Python 3 not found"
    exit 1
fi

# Check if conversion script exists
if [ ! -f "$CONVERSION_SCRIPT" ]; then
    log "ERROR: Conversion script not found: $CONVERSION_SCRIPT"
    exit 1
fi

# Convert Excel to JSON
log "Converting Excel to JSON..."
if python3 "$CONVERSION_SCRIPT" "$EXCEL_FILE"; then
    log "Conversion successful"
else
    log "ERROR: Conversion failed"
    exit 1
fi

# Check if data/guests.json was modified
if git diff --quiet data/guests.json; then
    log "No changes detected in guests.json"
    exit 0
fi

# Stage changes
log "Staging changes..."
git add data/guests.json

# Commit with timestamp
COMMIT_MSG="Auto-update: $(date '+%Y-%m-%d %H:%M')"
log "Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Push to GitHub
log "Pushing to GitHub..."
if git push origin main; then
    log "✅ Successfully synced to GitHub"

    # Optional: Send macOS notification
    osascript -e 'display notification "Guest list synced to GitHub" with title "Dini Petty Archives"'
else
    log "ERROR: Failed to push to GitHub"
    osascript -e 'display notification "Failed to sync. Check log file." with title "Dini Petty Archives" sound name "Basso"'
    exit 1
fi

log "=== Auto-sync completed ==="
```

**Deliverables:**
- ✅ Robust error handling
- ✅ Logging to file
- ✅ macOS notifications
- ✅ Git change detection (no empty commits)
- ✅ Find latest Excel file automatically

---

#### Task 1.2: Create LaunchAgent
**File:** `launchagent/com.dinipetty.autocommit.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Unique identifier -->
    <key>Label</key>
    <string>com.dinipetty.autocommit</string>

    <!-- Script to run -->
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/YOUR_USERNAME/scripts/auto-sync.sh</string>
    </array>

    <!-- Watch these directories for changes -->
    <key>WatchPaths</key>
    <array>
        <string>/Users/YOUR_USERNAME/Documents/DiniPetty</string>
    </array>

    <!-- Start on login -->
    <key>RunAtLoad</key>
    <true/>

    <!-- Throttle execution (don't run more than once per 30 seconds) -->
    <key>ThrottleInterval</key>
    <integer>30</integer>

    <!-- Keep alive (restart if crashes) -->
    <key>KeepAlive</key>
    <dict>
        <key>SuccessfulExit</key>
        <false/>
    </dict>

    <!-- Standard output/error logs -->
    <key>StandardOutPath</key>
    <string>/Users/YOUR_USERNAME/.dinipetty/launchagent.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/YOUR_USERNAME/.dinipetty/launchagent.error.log</string>

    <!-- Working directory -->
    <key>WorkingDirectory</key>
    <string>/Users/YOUR_USERNAME/Downloads/dini.petty</string>

    <!-- Environment variables -->
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
    </dict>
</dict>
</plist>
```

**Deliverables:**
- ✅ File watcher configured
- ✅ Auto-start on login
- ✅ Throttle to prevent spam
- ✅ Logging enabled
- ✅ Crash recovery

---

#### Task 1.3: Create One-Click Installer
**File:** `scripts/install-automation.sh`

```bash
#!/bin/bash
# One-Click Installer for Dini Petty Automation
# Usage: curl -sL https://raw.githubusercontent.com/jittikasa/dini.petty/main/scripts/install-automation.sh | bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print functions
print_step() {
    echo -e "${GREEN}==>${NC} $1"
}

print_error() {
    echo -e "${RED}ERROR:${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}WARNING:${NC} $1"
}

# Get username
USERNAME=$(whoami)
HOME_DIR="/Users/$USERNAME"

print_step "Dini Petty Archives - Auto-Sync Installer"
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "This installer only works on macOS"
    exit 1
fi

# Step 1: Check prerequisites
print_step "Step 1/7: Checking prerequisites..."

# Check Python 3
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed"
    echo "Install Python 3: brew install python3"
    exit 1
fi
echo "✅ Python 3 installed"

# Check Git
if ! command -v git &> /dev/null; then
    print_error "Git is not installed"
    echo "Install Git: brew install git"
    exit 1
fi
echo "✅ Git installed"

# Check pip
if ! command -v pip3 &> /dev/null; then
    print_error "pip3 is not installed"
    exit 1
fi
echo "✅ pip3 installed"

# Step 2: Create watch directory
print_step "Step 2/7: Creating watch directory..."
WATCH_DIR="$HOME_DIR/Documents/DiniPetty"
mkdir -p "$WATCH_DIR"
echo "✅ Created: $WATCH_DIR"

# Step 3: Clone or update repository
print_step "Step 3/7: Setting up repository..."
REPO_DIR="$HOME_DIR/Downloads/dini.petty"

if [ -d "$REPO_DIR" ]; then
    print_warning "Repository already exists. Pulling latest changes..."
    cd "$REPO_DIR"
    git pull origin main
else
    print_step "Cloning repository..."
    git clone https://github.com/jittikasa/dini.petty.git "$REPO_DIR"
fi
echo "✅ Repository ready: $REPO_DIR"

# Step 4: Install Python dependencies
print_step "Step 4/7: Installing Python dependencies..."
cd "$REPO_DIR"
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
else
    # Manually install known dependencies
    pip3 install openpyxl pandas
fi
echo "✅ Python dependencies installed"

# Step 5: Create auto-sync script
print_step "Step 5/7: Installing auto-sync script..."
mkdir -p "$HOME_DIR/scripts"

# Copy or create auto-sync.sh
if [ -f "$REPO_DIR/scripts/auto-sync.sh" ]; then
    cp "$REPO_DIR/scripts/auto-sync.sh" "$HOME_DIR/scripts/auto-sync.sh"
else
    print_error "auto-sync.sh not found in repository"
    exit 1
fi

# Make executable
chmod +x "$HOME_DIR/scripts/auto-sync.sh"
echo "✅ Auto-sync script installed: $HOME_DIR/scripts/auto-sync.sh"

# Step 6: Install LaunchAgent
print_step "Step 6/7: Installing LaunchAgent..."

# Create LaunchAgents directory
mkdir -p "$HOME_DIR/Library/LaunchAgents"

# Copy and modify plist file
PLIST_SRC="$REPO_DIR/launchagent/com.dinipetty.autocommit.plist"
PLIST_DST="$HOME_DIR/Library/LaunchAgents/com.dinipetty.autocommit.plist"

if [ -f "$PLIST_SRC" ]; then
    # Replace YOUR_USERNAME with actual username
    sed "s/YOUR_USERNAME/$USERNAME/g" "$PLIST_SRC" > "$PLIST_DST"
    echo "✅ LaunchAgent installed: $PLIST_DST"
else
    print_error "LaunchAgent plist not found in repository"
    exit 1
fi

# Step 7: Load LaunchAgent
print_step "Step 7/7: Activating auto-sync..."

# Unload if already loaded
launchctl unload "$PLIST_DST" 2>/dev/null || true

# Load LaunchAgent
if launchctl load "$PLIST_DST"; then
    echo "✅ Auto-sync activated"
else
    print_error "Failed to load LaunchAgent"
    exit 1
fi

# Create log directory
mkdir -p "$HOME_DIR/.dinipetty"

# Final instructions
echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ INSTALLATION COMPLETE!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📁 Place your Excel files here:"
echo "   $WATCH_DIR"
echo ""
echo "📝 Logs are saved here:"
echo "   $HOME_DIR/.dinipetty/sync.log"
echo ""
echo "🔧 To test the setup:"
echo "   1. Copy your Excel file to $WATCH_DIR"
echo "   2. Save the file (Cmd+S)"
echo "   3. Check the log: tail -f $HOME_DIR/.dinipetty/sync.log"
echo ""
echo "🛠  To uninstall:"
echo "   launchctl unload $PLIST_DST"
echo "   rm $PLIST_DST"
echo ""
echo "📖 For help, visit: https://github.com/jittikasa/dini.petty"
echo "═══════════════════════════════════════════════════════════"
```

**Deliverables:**
- ✅ Prerequisites check
- ✅ One-command installation
- ✅ Automatic dependency installation
- ✅ Clear success messages
- ✅ Troubleshooting instructions

---

#### Task 1.4: Update Repository Structure

```
dini.petty/
├── data/
│   └── guests.json                          # ✅ Already exists
├── scripts/
│   ├── excel-to-json.py                     # ✅ Already exists
│   ├── auto-sync.sh                         # ❌ CREATE (Task 1.1)
│   └── install-automation.sh                # ❌ CREATE (Task 1.3)
├── launchagent/
│   ├── com.dinipetty.autocommit.plist      # ❌ CREATE (Task 1.2)
│   └── README.md                            # ❌ CREATE (documentation)
├── dini-petty-archives/                     # ✅ WordPress plugin (already exists)
│   ├── dini-petty-archives.php
│   ├── includes/
│   └── assets/
├── docs/
│   ├── SETUP.md                             # ❌ CREATE (user guide)
│   ├── TROUBLESHOOTING.md                   # ❌ CREATE (common issues)
│   └── ARCHITECTURE.md                      # ❌ CREATE (technical docs)
├── tests/
│   ├── test-conversion.sh                   # ❌ CREATE (test Excel → JSON)
│   └── test-auto-sync.sh                    # ❌ CREATE (test full flow)
├── README.md                                # ✅ UPDATE (add installation section)
└── .github/
    └── workflows/
        └── validate-json.yml                # ❌ CREATE (Phase 3)
```

---

### Phase 2: Plugin Auto-Update (HIGH - Week 2)

#### Problem with Current Plugin Installation
```
Current:
1. Developer updates plugin code
2. Developer creates ZIP file
3. User downloads ZIP
4. User uploads to WordPress admin
5. User activates plugin

Required Actions: 5
This is BULLSHIT for a user who wants zero work
```

#### Solution: GitHub Releases + WordPress Auto-Update

**Architecture:**
```
Developer pushes plugin update
    ↓
GitHub Action creates release
    ↓
Generates ZIP file
    ↓
WordPress checks for updates (daily)
    ↓
Downloads new version
    ↓
Auto-installs
    ↓
User sees "Plugin updated" notification
```

**Implementation:**

##### Task 2.1: Add Update Checker to Plugin
**File:** `dini-petty-archives/includes/class-plugin-updater.php`

```php
<?php
/**
 * Plugin Auto-Updater
 * Checks GitHub releases for new versions
 */

class DiniPetty_Plugin_Updater {
    private $github_repo = 'jittikasa/dini.petty';
    private $plugin_slug = 'dini-petty-archives';
    private $plugin_file;
    private $version;

    public function __construct($plugin_file, $version) {
        $this->plugin_file = $plugin_file;
        $this->version = $version;

        add_filter('pre_set_site_transient_update_plugins', [$this, 'check_for_update']);
        add_filter('plugins_api', [$this, 'plugin_info'], 20, 3);
    }

    public function check_for_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }

        $remote_version = $this->get_remote_version();

        if ($remote_version && version_compare($this->version, $remote_version, '<')) {
            $plugin_data = [
                'slug' => $this->plugin_slug,
                'new_version' => $remote_version,
                'url' => "https://github.com/{$this->github_repo}",
                'package' => $this->get_download_url($remote_version),
            ];

            $transient->response[$this->plugin_file] = (object) $plugin_data;
        }

        return $transient;
    }

    private function get_remote_version() {
        $api_url = "https://api.github.com/repos/{$this->github_repo}/releases/latest";

        $response = wp_remote_get($api_url, [
            'timeout' => 10,
            'headers' => [
                'Accept' => 'application/vnd.github.v3+json',
            ],
        ]);

        if (is_wp_error($response)) {
            return false;
        }

        $release = json_decode(wp_remote_retrieve_body($response), true);

        return isset($release['tag_name']) ? ltrim($release['tag_name'], 'v') : false;
    }

    private function get_download_url($version) {
        return "https://github.com/{$this->github_repo}/releases/download/v{$version}/{$this->plugin_slug}.zip";
    }

    public function plugin_info($false, $action, $response) {
        if ($action !== 'plugin_information' || $response->slug !== $this->plugin_slug) {
            return $false;
        }

        $api_url = "https://api.github.com/repos/{$this->github_repo}/releases/latest";
        $remote = wp_remote_get($api_url);

        if (is_wp_error($remote)) {
            return $false;
        }

        $release = json_decode(wp_remote_retrieve_body($remote), true);

        $response = new stdClass();
        $response->name = 'Dini Petty Archives';
        $response->slug = $this->plugin_slug;
        $response->version = ltrim($release['tag_name'], 'v');
        $response->author = '<a href="https://github.com/jittikasa">jittikasa</a>';
        $response->homepage = "https://github.com/{$this->github_repo}";
        $response->download_link = $this->get_download_url($response->version);
        $response->sections = [
            'description' => 'Automatically syncs guest archives from GitHub',
            'changelog' => $release['body'],
        ];

        return $response;
    }
}
```

##### Task 2.2: Initialize Updater in Main Plugin File
**File:** `dini-petty-archives/dini-petty-archives.php`

```php
// Add to plugin header
/*
Plugin Name: Dini Petty Archives
Version: 1.0.0
GitHub Plugin URI: jittikasa/dini.petty
*/

// After plugin activation
require_once plugin_dir_path(__FILE__) . 'includes/class-plugin-updater.php';

if (class_exists('DiniPetty_Plugin_Updater')) {
    new DiniPetty_Plugin_Updater(__FILE__, '1.0.0');
}
```

##### Task 2.3: Create GitHub Action for Releases
**File:** `.github/workflows/release-plugin.yml`

```yaml
name: Release WordPress Plugin

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Get version from tag
        id: get_version
        run: echo "VERSION=${GITHUB_REF#refs/tags/v}" >> $GITHUB_OUTPUT

      - name: Create plugin ZIP
        run: |
          cd dini-petty-archives
          zip -r ../dini-petty-archives.zip . \
            -x "*.git*" \
            -x "*node_modules*" \
            -x "*.DS_Store*"

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: dini-petty-archives.zip
          body: |
            ## What's New in v${{ steps.get_version.outputs.VERSION }}

            Auto-generated release. See commit history for details.

            ## Installation
            1. WordPress will auto-update if plugin is already installed
            2. For manual installation: Download ZIP and upload to WordPress
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Deliverables:**
- ✅ Plugin checks GitHub for updates daily
- ✅ One-click update in WordPress admin
- ✅ Automatic ZIP creation on tag push
- ✅ User sees update notification in WP dashboard

---

### Phase 3: Advanced Features (MEDIUM - Week 3)

#### Task 3.1: GitHub Actions for Validation
**File:** `.github/workflows/validate-json.yml`

```yaml
name: Validate Guest Data

on:
  push:
    paths:
      - 'data/guests.json'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Validate JSON syntax
        run: |
          if ! jq empty data/guests.json; then
            echo "❌ Invalid JSON syntax"
            exit 1
          fi
          echo "✅ JSON syntax valid"

      - name: Validate data structure
        run: |
          # Check required fields
          REQUIRED_FIELDS=("name" "year" "topic")

          for field in "${REQUIRED_FIELDS[@]}"; do
            if ! jq -e ".[0] | has(\"$field\")" data/guests.json > /dev/null; then
              echo "❌ Missing required field: $field"
              exit 1
            fi
          done

          echo "✅ Data structure valid"

      - name: Check for duplicates
        run: |
          DUPLICATES=$(jq -r '.[].name' data/guests.json | sort | uniq -d)

          if [ -n "$DUPLICATES" ]; then
            echo "⚠️  Duplicate guests found:"
            echo "$DUPLICATES"
          else
            echo "✅ No duplicates"
          fi
```

#### Task 3.2: Conflict Resolution
**Enhancement to auto-sync.sh:**

```bash
# Before git push, check for conflicts
git fetch origin main

if ! git diff --quiet HEAD origin/main; then
    log "Remote changes detected. Attempting merge..."

    if git merge origin/main --no-edit; then
        log "Merge successful"
    else
        log "ERROR: Merge conflict detected"
        log "Manual intervention required"

        # Send alert
        osascript -e 'display notification "Merge conflict - check log" with title "Dini Petty Archives" sound name "Basso"'

        # Abort merge
        git merge --abort
        exit 1
    fi
fi
```

#### Task 3.3: Status Dashboard (Optional)
**Desktop App Using Electron (Advanced):**

```
Features:
- Show last sync time
- Display sync log
- Manual trigger button
- Status indicator (green = synced, red = error)
- Excel file drop zone
- GitHub commit history viewer
```

---

## PART 4: TESTING & VALIDATION

### Test Plan

#### Test 1: End-to-End Happy Path
```bash
# Given: User has Excel file
# When: User saves file to ~/Documents/DiniPetty/
# Then: File should auto-sync to GitHub within 30 seconds

# Verify:
1. Check log: tail -f ~/.dinipetty/sync.log
2. Check GitHub: git log --oneline -5
3. Check WordPress: Visit dinipetty.com/archives
4. Verify: New data appears on website
```

#### Test 2: No Changes Scenario
```bash
# Given: Excel file unchanged
# When: User saves file again
# Then: No commit should be created

# Verify:
1. Log should say "No changes detected"
2. No new commit in git log
3. GitHub push count unchanged
```

#### Test 3: Multiple Rapid Saves
```bash
# Given: User saves file 5 times in 10 seconds
# When: LaunchAgent throttles execution
# Then: Only 1 sync should occur (30-second throttle)

# Verify:
1. Check log for throttle message
2. Only 1 commit created
3. System not overwhelmed
```

#### Test 4: Excel File Corruption
```bash
# Given: Invalid Excel file
# When: Conversion script runs
# Then: Error should be logged, no commit

# Verify:
1. Log shows "Conversion failed"
2. No changes to guests.json
3. User gets notification of failure
```

#### Test 5: Git Push Failure
```bash
# Given: No internet connection
# When: Auto-sync attempts push
# Then: Error logged, user notified

# Verify:
1. Log shows "Failed to push to GitHub"
2. Changes remain uncommitted locally
3. User sees error notification
4. Next sync retries push
```

#### Test 6: WordPress Sync
```bash
# Given: New data pushed to GitHub
# When: WordPress cache expires (1 hour)
# Then: WordPress fetches new data

# Verify:
1. Check transient: get_transient('dinipetty_guests_cache')
2. Force refresh: delete_transient('dinipetty_guests_cache')
3. Visit website: Data should update
```

---

## PART 5: DOCUMENTATION

### User Guide (docs/SETUP.md)

```markdown
# Dini Petty Archives - User Setup Guide

## What You'll Get
Save your Excel file → Website updates automatically

**No commands. No terminal. No technical knowledge needed.**

---

## Prerequisites
- macOS (Catalina or later)
- Excel or Numbers (to edit Excel files)
- Internet connection

---

## Installation (One Command)

Open **Terminal** (Applications → Utilities → Terminal) and paste:

```bash
curl -sL https://raw.githubusercontent.com/jittikasa/dini.petty/main/scripts/install-automation.sh | bash
```

Press Enter and wait ~2 minutes.

You'll see:
```
✅ INSTALLATION COMPLETE!
```

---

## Usage

### Step 1: Edit Your Excel File
Open `~/Documents/DiniPetty/guests.xlsx` in Excel

Make your changes (add guests, update info, etc.)

### Step 2: Save the File
Press `Cmd+S` (or File → Save)

### Step 3: Done!
That's it. The system does the rest:
- Converts Excel to JSON (automatic)
- Commits to GitHub (automatic)
- Updates website (automatic in ~1 hour)

---

## How to Know It Worked

### Check 1: Look for Notification
After saving, you should see a macOS notification:
```
Dini Petty Archives
Guest list synced to GitHub
```

### Check 2: View the Log
```bash
tail -f ~/.dinipetty/sync.log
```

You should see:
```
[2026-01-10 14:30:00] === Auto-sync triggered ===
[2026-01-10 14:30:01] Found Excel file: /Users/you/Documents/DiniPetty/guests.xlsx
[2026-01-10 14:30:02] Converting Excel to JSON...
[2026-01-10 14:30:03] Conversion successful
[2026-01-10 14:30:04] Staging changes...
[2026-01-10 14:30:04] Committing: Auto-update: 2026-01-10 14:30
[2026-01-10 14:30:05] Pushing to GitHub...
[2026-01-10 14:30:07] ✅ Successfully synced to GitHub
```

### Check 3: Visit GitHub
Go to: https://github.com/jittikasa/dini.petty/commits/main

You should see a new commit: "Auto-update: 2026-01-10 14:30"

### Check 4: Check Website
Visit: https://dinipetty.com/archives

Wait up to 1 hour for cache to refresh, or ask site admin to clear cache

---

## Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## Uninstallation

```bash
launchctl unload ~/Library/LaunchAgents/com.dinipetty.autocommit.plist
rm ~/Library/LaunchAgents/com.dinipetty.autocommit.plist
rm ~/scripts/auto-sync.sh
```
```

---

### Troubleshooting Guide (docs/TROUBLESHOOTING.md)

```markdown
# Troubleshooting Guide

## Problem: No Notification After Saving

### Possible Causes
1. LaunchAgent not running
2. File saved outside watch directory
3. Excel file has different extension (.xls instead of .xlsx)

### Solutions

**Check if LaunchAgent is running:**
```bash
launchctl list | grep dinipetty
```

Expected output:
```
-    0    com.dinipetty.autocommit
```

If nothing appears:
```bash
launchctl load ~/Library/LaunchAgents/com.dinipetty.autocommit.plist
```

**Check file location:**
```bash
ls -la ~/Documents/DiniPetty/
```

Make sure your Excel file is in this directory.

**Check file extension:**
```bash
file ~/Documents/DiniPetty/*.xlsx
```

Should say: "Microsoft Excel 2007+"

If it says "Microsoft Excel 97", convert to .xlsx format.

---

## Problem: "Conversion failed" Error

### Possible Causes
1. Excel file is corrupted
2. Missing Python dependencies
3. File is locked/in use

### Solutions

**Test conversion manually:**
```bash
cd ~/Downloads/dini.petty
python3 scripts/excel-to-json.py ~/Documents/DiniPetty/guests.xlsx
```

**Reinstall dependencies:**
```bash
pip3 install --upgrade openpyxl pandas
```

**Close Excel and try again:**
Make sure Excel is closed after saving.

---

## Problem: "Failed to push to GitHub"

### Possible Causes
1. No internet connection
2. Git authentication expired
3. Remote repository changed

### Solutions

**Test internet:**
```bash
ping github.com
```

**Test git push manually:**
```bash
cd ~/Downloads/dini.petty
git push origin main
```

If prompted for credentials, update them:
```bash
git config --global credential.helper osxkeychain
git push origin main
```

**Check remote URL:**
```bash
cd ~/Downloads/dini.petty
git remote -v
```

Should show:
```
origin  https://github.com/jittikasa/dini.petty.git (fetch)
origin  https://github.com/jittikasa/dini.petty.git (push)
```

---

## Problem: Website Not Updating

### Possible Causes
1. WordPress cache not expired yet
2. WordPress plugin not installed
3. GitHub sync failed

### Solutions

**Check GitHub for recent commits:**
https://github.com/jittikasa/dini.petty/commits/main

**Clear WordPress cache (for site admin):**
1. Log in to WordPress admin
2. Go to Settings → Dini Petty Archives
3. Click "Clear Cache"

**Check plugin status:**
1. Log in to WordPress admin
2. Go to Plugins
3. Find "Dini Petty Archives"
4. Should be **Active**

---

## Problem: LaunchAgent Keeps Crashing

### Check Logs
```bash
cat ~/.dinipetty/launchagent.error.log
```

### Common Errors

**"Permission denied"**
```bash
chmod +x ~/scripts/auto-sync.sh
```

**"Python not found"**
```bash
which python3
# Update PATH in LaunchAgent plist
```

**"Git not found"**
```bash
which git
# Update PATH in LaunchAgent plist
```

---

## Advanced Debugging

### View Live Log
```bash
tail -f ~/.dinipetty/sync.log
```

### Test Auto-Sync Manually
```bash
bash ~/scripts/auto-sync.sh
```

### Restart LaunchAgent
```bash
launchctl unload ~/Library/LaunchAgents/com.dinipetty.autocommit.plist
launchctl load ~/Library/LaunchAgents/com.dinipetty.autocommit.plist
```

### Check LaunchAgent Status
```bash
launchctl list com.dinipetty.autocommit
```

---

## Still Having Issues?

1. **Check the log file:**
   ```bash
   cat ~/.dinipetty/sync.log
   ```

2. **Copy the error message**

3. **Create an issue on GitHub:**
   https://github.com/jittikasa/dini.petty/issues

Include:
- The error message from the log
- What you were trying to do
- Output of: `sw_vers` (your macOS version)
```

---

## PART 6: COMPARISON MATRICES

### Before vs. After

| Metric | Current (Semi-Auto) | After Phase 1 (Full Auto) |
|--------|---------------------|---------------------------|
| **Manual commands** | 3 | 0 |
| **Technical knowledge** | High | Zero |
| **Time to update website** | ~5 minutes | ~30 seconds (+ 1hr cache) |
| **Error-prone steps** | 3 | 0 |
| **Can user forget?** | Yes | No (automatic) |
| **Setup complexity** | High | One command |
| **True automation** | ❌ No | ✅ Yes |

---

### Feature Comparison: Dini Petty vs. Islander Studio

| Feature | Islander Studio | Dini Petty (After Implementation) |
|---------|----------------|-----------------------------------|
| **Git-based workflow** | ✅ Yes | ✅ Yes |
| **Auto-deployment** | ✅ Yes (Cloudflare Pages) | ✅ Yes (LaunchAgent) |
| **Zero manual commands** | ✅ Yes | ✅ Yes |
| **Edge computing** | ✅ Yes (Workers) | ⚠️  No (WordPress) |
| **Serverless backend** | ✅ Yes (Workers) | ⚠️  No (WordPress) |
| **Auto-updates** | ✅ Yes (Cloudflare) | ✅ Yes (GitHub Releases) |
| **Preview environments** | ✅ Yes (branch deploys) | ❌ No (single environment) |
| **CI/CD pipeline** | ✅ Yes (GitHub Actions) | ✅ Yes (validation workflow) |
| **Documentation** | ✅ Comprehensive | ✅ Comprehensive (to be created) |
| **One-click setup** | ⚠️  Semi (Cloudflare dashboard) | ✅ Yes (install script) |

---

## PART 7: RISK ASSESSMENT

### Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **LaunchAgent fails to start** | Medium | High | Auto-restart on crash, error notifications |
| **Git push fails (no internet)** | Low | Medium | Queue commits, retry on next connection |
| **Excel file corrupted** | Low | Low | Validation, error handling, no commit |
| **GitHub API rate limits** | Very Low | Low | Plugin checks once per day, caching |
| **WordPress plugin conflicts** | Low | Medium | Namespace functions, minimal dependencies |
| **User deletes watch directory** | Low | High | Document clearly, add check in script |
| **Multiple Excel files in directory** | Medium | Low | Use most recent file (by timestamp) |
| **macOS permission issues** | Medium | Medium | Installer requests permissions upfront |

---

## PART 8: SUCCESS CRITERIA

### Phase 1 Success Metrics
- [ ] User can install with ONE command
- [ ] User saves Excel file and sees notification
- [ ] GitHub receives commit within 30 seconds
- [ ] WordPress syncs data within 1 hour
- [ ] Website displays updated data
- [ ] User runs ZERO manual commands
- [ ] System works without user intervention for 30 days

### Phase 2 Success Metrics
- [ ] Plugin auto-updates from GitHub releases
- [ ] User clicks "Update" button in WordPress (one click, not ZIP upload)
- [ ] Update completes without errors
- [ ] Website continues functioning after update

### Phase 3 Success Metrics
- [ ] JSON validation prevents corrupt data
- [ ] Conflict resolution handles edge cases
- [ ] System is resilient to errors
- [ ] Comprehensive logs for debugging

---

## PART 9: IMPLEMENTATION TIMELINE

### Week 1: Core Automation (Phase 1)
| Day | Task | Deliverable |
|-----|------|-------------|
| **Mon** | Create auto-sync.sh | Working script with error handling |
| **Tue** | Create LaunchAgent plist | File watcher configured |
| **Wed** | Create install-automation.sh | One-command installer |
| **Thu** | Create documentation (SETUP.md, TROUBLESHOOTING.md) | User guides |
| **Fri** | End-to-end testing | All 6 tests pass |

### Week 2: Plugin Auto-Update (Phase 2)
| Day | Task | Deliverable |
|-----|------|-------------|
| **Mon** | Create plugin updater class | Auto-update code |
| **Tue** | Integrate with main plugin | Updater initialized |
| **Wed** | Create GitHub Action for releases | Auto-ZIP on tag |
| **Thu** | Test update workflow | Plugin updates successfully |
| **Fri** | Documentation updates | Guide updated |

### Week 3: Advanced Features (Phase 3)
| Day | Task | Deliverable |
|-----|------|-------------|
| **Mon** | Create validation workflow | GitHub Action |
| **Tue** | Add conflict resolution | Enhanced auto-sync.sh |
| **Wed** | Create test suite | Automated tests |
| **Thu** | Final testing & bug fixes | All tests green |
| **Fri** | Launch & handoff | System live |

---

## PART 10: HANDOFF CHECKLIST

### For Next Developer/Agent

#### Repository Files to Create
- [ ] `scripts/auto-sync.sh` (Task 1.1)
- [ ] `launchagent/com.dinipetty.autocommit.plist` (Task 1.2)
- [ ] `scripts/install-automation.sh` (Task 1.3)
- [ ] `dini-petty-archives/includes/class-plugin-updater.php` (Task 2.1)
- [ ] `.github/workflows/release-plugin.yml` (Task 2.3)
- [ ] `.github/workflows/validate-json.yml` (Task 3.1)
- [ ] `docs/SETUP.md` (User guide)
- [ ] `docs/TROUBLESHOOTING.md` (Troubleshooting)
- [ ] `docs/ARCHITECTURE.md` (Technical docs)
- [ ] `tests/test-conversion.sh` (Test suite)
- [ ] `tests/test-auto-sync.sh` (Test suite)

#### Repository Files to Update
- [ ] `README.md` (Add installation section)
- [ ] `dini-petty-archives/dini-petty-archives.php` (Initialize updater)
- [ ] Add `requirements.txt` (Python dependencies: openpyxl, pandas)

#### Testing Checklist
- [ ] Test 1: End-to-end happy path
- [ ] Test 2: No changes scenario
- [ ] Test 3: Multiple rapid saves
- [ ] Test 4: Excel file corruption
- [ ] Test 5: Git push failure
- [ ] Test 6: WordPress sync

#### Deployment Steps
1. [ ] Push all files to `main` branch
2. [ ] Create first GitHub release (v1.0.0)
3. [ ] Test installation on clean Mac
4. [ ] Update documentation with real usernames/paths
5. [ ] Test full workflow end-to-end
6. [ ] Deploy WordPress plugin update
7. [ ] Monitor logs for 48 hours

---

## PART 11: LEARNING FROM ISLANDER STUDIO

### What Islander Studio Does Right (Apply to Dini Petty)

1. **Zero-Command Deployment**
   - Islander: Push to GitHub → Cloudflare auto-deploys
   - Dini Petty: Save Excel → LaunchAgent auto-syncs
   - ✅ Applied

2. **Comprehensive Documentation**
   - Islander: DEPLOYMENT.md, migration guides, troubleshooting
   - Dini Petty: SETUP.md, TROUBLESHOOTING.md, ARCHITECTURE.md
   - ✅ Applied

3. **API-First Architecture**
   - Islander: Clean separation (React SPA + Workers API)
   - Dini Petty: Clean separation (Excel → GitHub → WordPress API)
   - ✅ Applied

4. **Version Control as Source of Truth**
   - Islander: Code in Git, deployed from Git
   - Dini Petty: Data in Git, WordPress fetches from Git
   - ✅ Applied

5. **Automated Asset Generation**
   - Islander: AI-generated app icons/screenshots
   - Dini Petty: Auto-convert Excel to JSON
   - ✅ Applied (different asset type, same principle)

6. **Edge Computing**
   - Islander: Cloudflare Workers at edge
   - Dini Petty: Not applicable (WordPress hosting)
   - ⚠️  Not applicable (but could migrate to Cloudflare Workers + D1 in future)

7. **GitHub Actions for CI/CD**
   - Islander: Deploy Sanity Studio on push
   - Dini Petty: Validate JSON, create releases
   - ✅ Applied

8. **Modular, Maintainable Code**
   - Islander: Separated components, clear file structure
   - Dini Petty: Separated scripts, plugin updater class
   - ✅ Applied

---

## PART 12: FUTURE ENHANCEMENTS (Post-Launch)

### Optional Phase 4: Advanced Automation

1. **Desktop App (Electron)**
   - Drag & drop Excel file
   - Visual sync status
   - Manual trigger button
   - Commit history viewer

2. **Mobile App (React Native)**
   - Upload Excel from phone
   - View guest list
   - Push to GitHub
   - Mobile-first editing

3. **Migrate to Cloudflare Platform** (Like Islander Studio)
   - Cloudflare Workers for API
   - Cloudflare D1 for database
   - Eliminate WordPress dependency
   - True edge computing

4. **Real-Time Sync** (WebSockets)
   - Instant website updates (no 1-hour cache)
   - Live editing in browser
   - Collaborative editing

5. **AI-Powered Features**
   - Auto-generate guest descriptions
   - Suggest topic categories
   - Find related guests
   - Generate episode summaries

6. **Analytics Dashboard**
   - Most searched guests
   - Popular topics
   - Search trends
   - User behavior

---

## CONCLUSION

### Current State: Semi-Automated (C+)
- User has manual work (3 commands)
- Requires technical knowledge
- Easy to forget steps
- Not truly automated

### After Implementation: Fully Automated (A+)
- User does ONE thing: save Excel file
- Zero technical knowledge required
- Impossible to forget steps (automatic)
- True "set and forget" automation

### Key Success Factor
**User's workflow: Cmd+S → Done**

Everything else is automatic, invisible, and reliable.

---

## FINAL CHECKLIST

### Before Marking This Project Complete
- [ ] User can save Excel file with ONE action (Cmd+S)
- [ ] User runs ZERO commands
- [ ] User uploads ZERO files to WordPress
- [ ] User has ZERO technical barriers
- [ ] System works for 30 days without user intervention
- [ ] Comprehensive documentation exists
- [ ] All tests pass
- [ ] Error handling is robust
- [ ] User received setup instructions

**If any box is unchecked, the project is NOT complete.**

---

## APPENDIX A: COMMANDS REFERENCE

### For User (After Installation)

```bash
# View sync log
tail -f ~/.dinipetty/sync.log

# Test auto-sync manually
bash ~/scripts/auto-sync.sh

# Restart auto-sync
launchctl unload ~/Library/LaunchAgents/com.dinipetty.autocommit.plist
launchctl load ~/Library/LaunchAgents/com.dinipetty.autocommit.plist

# Check auto-sync status
launchctl list com.dinipetty.autocommit

# Uninstall
launchctl unload ~/Library/LaunchAgents/com.dinipetty.autocommit.plist
rm ~/Library/LaunchAgents/com.dinipetty.autocommit.plist
rm ~/scripts/auto-sync.sh
```

### For Developer

```bash
# Clone repository
git clone https://github.com/jittikasa/dini.petty.git
cd dini.petty

# Install Python dependencies
pip3 install -r requirements.txt

# Test conversion
python3 scripts/excel-to-json.py test-file.xlsx

# Test auto-sync
bash scripts/auto-sync.sh

# Create release
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0

# Deploy plugin update
# (Automatic via GitHub Action on tag push)

# Validate JSON
jq empty data/guests.json
```

---

## APPENDIX B: FILE LOCATIONS

### On User's Mac

| Path | Description |
|------|-------------|
| `~/Documents/DiniPetty/` | Watch directory for Excel files |
| `~/Documents/DiniPetty/guests.xlsx` | User's Excel file |
| `~/Downloads/dini.petty/` | Cloned repository |
| `~/scripts/auto-sync.sh` | Auto-sync script |
| `~/Library/LaunchAgents/com.dinipetty.autocommit.plist` | LaunchAgent config |
| `~/.dinipetty/sync.log` | Sync log file |
| `~/.dinipetty/launchagent.log` | LaunchAgent stdout |
| `~/.dinipetty/launchagent.error.log` | LaunchAgent stderr |

### On GitHub

| Path | Description |
|------|-------------|
| `data/guests.json` | Generated JSON data |
| `scripts/excel-to-json.py` | Conversion script |
| `scripts/auto-sync.sh` | Auto-sync script |
| `scripts/install-automation.sh` | One-click installer |
| `launchagent/com.dinipetty.autocommit.plist` | LaunchAgent template |
| `dini-petty-archives/` | WordPress plugin |
| `docs/` | Documentation |
| `.github/workflows/` | GitHub Actions |

### On WordPress

| Path | Description |
|------|-------------|
| `wp-content/plugins/dini-petty-archives/` | Plugin directory |
| WordPress Transients | Cached guest data (1-hour TTL) |
| WordPress Options | Plugin settings |

---

## APPENDIX C: DEPENDENCIES

### User's Mac

| Dependency | Version | Purpose |
|------------|---------|---------|
| macOS | 10.15+ | Operating system |
| Python 3 | 3.8+ | Run conversion script |
| pip3 | Latest | Install Python packages |
| Git | 2.0+ | Version control |
| openpyxl | Latest | Read Excel files |
| pandas | Latest | Data manipulation |

### WordPress

| Dependency | Version | Purpose |
|------------|---------|---------|
| WordPress | 5.0+ | CMS platform |
| PHP | 7.4+ | WordPress requirement |
| cURL | - | Fetch from GitHub |

### GitHub

| Dependency | Version | Purpose |
|------------|---------|---------|
| GitHub Actions | - | CI/CD workflows |
| jq | 1.6+ | JSON validation |

---

**END OF BRIEF**

**Total Pages:** 50+
**Total Implementation Time:** 3 weeks
**Priority:** HIGH
**Status:** Ready for implementation

**Next Step:** Begin Phase 1, Task 1.1 (Create auto-sync.sh)
