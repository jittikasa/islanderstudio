import SwiftUI

struct ShellistDesignSystem {
    // Shell/Pearl Color Palette
    static let primaryShell = sunset
    static let secondaryShell = sunset
    static let pearlWhite = haze
    static let pearlGray = pebble.opacity(0.3)
    static let oceanBlue = primaryBlue
    static let sandBeige = clam

    // Text Colors
    static let primaryText = Color.black
    static let secondaryText = textGray
    static let tertiaryText = textGray.opacity(0.7)
    static let completedText = textGray

    // Accent Colors (using proper hex values for consistency)
    static let successGreen = Color(hex: "4CAF50")  // Material Green
    static let warningAmber = amber  
    static let errorCoral = Color(hex: "F44336")    // Material Red

    // Legacy support
    static let primaryOrange = primaryShell
    static let primaryBrown = moss
    
    // Brand Color Palette (updated to use new tonal system)
    static let moss = mossDark                // #9E9282  
    static let clam = mossMedium             // #C5B9A8
    static let seagrass = seafoamDark        // #799999
    static let sand = Color(hex: "FAF9F2")
    static let pearl = Color(hex: "F2F0E6")
    static let pebble = Color(hex: "E0E0E0")
    static let onyx = Color(hex: "979797")
    static let seafoam = Color(hex: "D2E6DE")
    static let sunbeam = Color(hex: "FAF0B3")
    static let khaki = Color(hex: "BDB76B")
    static let sunset = sunsetDark           // #F4A574
    static let amber = coralDark             // #B25456
    static let textGray = Color(hex: "7E8383")
    static let darkTextGray = Color(hex: "374151")
    static let obsidian = Color(hex: "333333")
    
    // Background Gradients (replacing hardcoded values)
    static let backgroundGradientTop = sand      // #FAF9F2
    static let backgroundGradientMid = misty     // #F0F2F5  
    static let backgroundGradientBottom = tidesLight // #DAE5EB
    
    // Overlay Colors (replacing hardcoded opacities)
    static let whiteOverlay30 = Color.white.opacity(0.3)
    static let blackShadow15 = Color.black.opacity(0.15)
    static let grayShadow05 = pebble.opacity(0.5)
    
    // NEW TONAL PALETTE SYSTEM (3 variants each)
    // Tides: Blue tones
    static let tidesLight = Color(hex: "DAE5EB")    // Light blue
    static let tidesMedium = Color(hex: "99BBCE")   // Medium blue  
    static let tidesDark = Color(hex: "60849C")     // Dark blue
    
    // Seafoam: Green-blue tones
    static let seafoamLight = Color(hex: "D9EAE3")  // Light seafoam
    static let seafoamMedium = Color(hex: "A6BFB8") // Medium seafoam
    static let seafoamDark = Color(hex: "799999")   // Dark seafoam
    
    // Moss: Brown-beige tones
    static let mossLight = Color(hex: "E8E3DD")     // Light moss
    static let mossMedium = Color(hex: "C5B9A8")    // Medium moss
    static let mossDark = Color(hex: "9E9282")      // Dark moss
    static let oldmoss = Color(hex: "746B5D")       // Old moss
    
    // Laguna: Yellow-green tones
    static let lagunaLight = Color(hex: "F7F0C8")   // Light laguna
    static let lagunaMedium = Color(hex: "EBE09F")  // Medium laguna
    static let lagunaDark = Color(hex: "D4C56F")    // Dark laguna
    static let oldlaguna = Color(hex: "B9AC5F")     // Old laguna
    
    // Topaz: Orange-brown tones
    static let topazLight = Color(hex: "F7DDC2")    // Light topaz
    static let topazMedium = Color(hex: "CF9963")   // Medium topaz
    static let topazDark = Color(hex: "A0702F")     // Dark topaz
    
    // Sunset: Orange-pink tones
    static let sunsetLight = Color(hex: "FEE4D4")   // Light sunset
    static let sunsetMedium = Color(hex: "FFCDAF")  // Medium sunset
    static let sunsetDark = Color(hex: "F4A574")    // Dark sunset
    
    // Oyster: Cream-beige tones
    static let oysterLight = Color(hex: "FAF0EA")   // Light oyster
    static let oysterMedium = Color(hex: "F5E3D9")  // Medium oyster
    static let oysterDark = Color(hex: "E6C1AD")    // Dark oyster
    
    // Coral: Pink-red tones
    static let coralLight = Color(hex: "FAE4E4")    // Light coral
    static let coralMedium = Color(hex: "E2AAAB")   // Medium coral
    static let coralDark = Color(hex: "B25456")     // Dark coral
    
    // Twilight: Purple tones
    static let twilightLight = Color(hex: "DDD6EB") // Light twilight
    static let twilightMedium = Color(hex: "C1B2DF") // Medium twilight
    static let twilightDark = Color(hex: "9782C2")  // Dark twilight
    
    // Limestone: Light gray-beige tones
    static let limestone = Color(hex: "F5F4F2")     // Limestone - soft gray-beige
    
    // Misty: Very light blue-gray tones  
    static let misty = Color(hex: "F0F2F5")         // Misty - soft blue-gray
    
    // Haze: Pure white
    static let haze = Color(hex: "FFFFFF")          // Haze - pure white
    
    // UPDATED Category Color Palette (using new tonal system)
    static let categoryHealth = seafoamLight        // Health: Light seafoam
    static let categoryFitness = sunsetLight        // Fitness: Light sunset
    static let categoryLearning = lagunaLight       // Learning: Light laguna
    static let categoryWork = pebble                // Work: Light gray
    static let categoryPersonal = twilightLight     // Personal: Light twilight
    static let categoryMindfulness = tidesLight     // Mindfulness: Light tides
    static let categoryCreative = coralLight        // Creative: Light coral
    static let categorySocial = topazLight          // Social: Light topaz
    static let categorySpiritual = mossLight        // Spiritual: Light moss
    static let categoryProductivity = lagunaLight  // Productivity: Light laguna
    static let categoryDefault = mossLight          // Default: Light moss
    
    // Legacy names (for compatibility - updated to use new tonal system)
    static let lightBrown = mossDark           // was moss
    static let selectedBrown = mossMedium      // was clam  
    static let darkGreen = seafoamDark         // was seagrass
    static let creamBackground = sand
    static let lightGray = pearl
    static let borderGray = pebble
    static let buttonGray = pebble
    
    // Updated blue palette references
    static let primaryBlue = tidesDark        // Update blue palette
    static let mediumBlue = tidesMedium       // Update blue palette  
    static let lightBlue = tidesLight         // Update blue palette

    // Gradients
    static let shellGradient = LinearGradient(
        colors: [primaryShell, secondaryShell],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let pearlGradient = LinearGradient(
        colors: [pearlWhite, pearlGray],
        startPoint: .top,
        endPoint: .bottom
    )

    /// Primary Shellist background gradient used throughout the app
    /// 3-color coastal gradient: sand → misty → light blue
    /// Used in: Dashboard, HabitListView, ProgressView, ProfileView, etc.
    static let backgroundGradient = LinearGradient(
        colors: [
            backgroundGradientTop,    // sand #FAF9F2
            backgroundGradientMid,    // misty #F0F2F5
            backgroundGradientBottom  // tidesLight #DAE5EB
        ],
        startPoint: .top,
        endPoint: .bottom
    )

    // Additional UI colors
    static let selectedBackground = grayShadow05
    static let borderColor = pebble.opacity(0.3)
    
    // Shadows
    static let cardShadow = blackShadow15.opacity(0.5)
    static let shellShadow = blackShadow15.opacity(0.8)
    
    
    // Typography System
    static let display = Font.system(size: 64, weight: .bold)
    static let titleLarge = Font.system(size: 22, weight: .bold)
    static let titleMedium = Font.system(size: 18, weight: .semibold) 
    static let titleSmall = Font.system(size: 16, weight: .semibold)
    static let bodyMedium = Font.system(size: 14, weight: .medium)
    static let habitName = Font.system(size: 13, weight: .medium)
    static let bodySmall = Font.system(size: 12, weight: .medium)
    static let caption = Font.system(size: 10, weight: .medium)
    
    
    // Spacing System - Consistent 4pt grid
    static let spacing2: CGFloat = 2    // Micro spacing
    static let spacing4: CGFloat = 4    // Tiny spacing
    static let spacing8: CGFloat = 8    // Small spacing
    static let spacing12: CGFloat = 12  // Medium spacing
    static let spacing16: CGFloat = 16  // Large spacing
    static let spacing20: CGFloat = 20  // XL spacing
    static let spacing24: CGFloat = 24  // XXL spacing
    static let spacing32: CGFloat = 32  // XXXL spacing

    // Standard Page Layout Patterns (from HabitListView)
    static let pageHorizontalMargin: CGFloat = spacing20     // 20pt - Standard horizontal page margin
    static let pageSectionSpacing: CGFloat = spacing24       // 24pt - Space between major page sections
    static let pageBottomClearance: CGFloat = 100           // 100pt - Bottom clearance for tab bar
    static let headerTopPadding: CGFloat = 9                // 9pt - Standard header top padding
    static let headerBottomPadding: CGFloat = 0             // 0pt - Standard header bottom padding

    // Detail View Layout Standards (from HabitDetailView)
    static let detailViewHeaderTopPadding: CGFloat = -spacing8  // -8pt - Pulls header up closer to nav bar
    static let detailViewNavBarHeight: CGFloat = 68          // 68pt - Nav bar total height (36pt button + 16pt padding top/bottom)
    
    // Button Size System - Consistent sizing hierarchy
    static let buttonSizeMicro: CGFloat = 20   // Selection dots
    static let buttonSizeSmall: CGFloat = 44   // Tab icons
    static let buttonSizeMedium: CGFloat = 60  // Habit buttons
    static let buttonSizeLarge: CGFloat = 64   // Shell button

    // Tab Bar Design Standards
    static let tabBarHeight: CGFloat = 54           // Total tab bar height (optimized: balances iOS standard 49pt with shell button prominence)
    static let tabBarIconSize: CGFloat = 20         // Tab bar icon size
    static let tabBarButtonHeight: CGFloat = 44     // Tab bar button tap target height
    static let tabBarSelectionDotSize: CGFloat = 5  // Selection indicator dot size
    static let tabBarCenterButtonSize: CGFloat = 70 // Center quick access button size (shell icon)
    static let tabBarIconSpacing: CGFloat = 4       // Space between icon and selection dot

    // Corner Radius System - Consistent rounding
    static let cornerRadiusSmall: CGFloat = 8   // Small components
    static let cornerRadiusMedium: CGFloat = 12 // Standard components
    static let cornerRadiusLarge: CGFloat = 16  // Large components
    static let cornerRadiusFull: CGFloat = 50   // Fully rounded (pills)
    
    // MARK: - Card Design System
    
    /// Standard card design used throughout the app
    /// Usage: Apply to any card/container view for consistency
    static func standardCard(content: some View) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.white)
                    .shadow(color: .black.opacity(0.03), radius: 3, x: 0, y: 1)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(
                        Color(red: 0.88, green: 0.88, blue: 0.88).opacity(0.70),
                        lineWidth: 0.25
                    )
            )
    }

    /// Static metric card for non-interactive analytics displays
    /// Features: 30% white background, colored border matching accent color
    /// Usage: staticMetricCard(content: MetricContent, borderColor: ShellistDesignSystem.seafoamMedium)
    static func staticMetricCard<Content: View>(
        content: Content,
        borderColor: Color
    ) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.white.opacity(0.3))
                    .shadow(color: .black.opacity(0.03), radius: 3, x: 0, y: 1)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(borderColor.opacity(0.7), lineWidth: 1)
            )
    }

    /// Habit card with completion state support
    /// Provides consistent completion styling across all views
    /// Usage: habitCard(content: HabitRowView(...), isCompleted: isCompletedState)
    static func habitCard<Content: View>(
        content: Content,
        isCompleted: Bool
    ) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: cardCornerRadius)
                    .fill(isCompleted ? creamBackground : Color.white)
                    .shadow(color: cardShadowColor, radius: cardShadowRadius, x: 0, y: 1)
            )
            .overlay(
                RoundedRectangle(cornerRadius: cardCornerRadius)
                    .stroke(cardBorderColor, lineWidth: cardBorderWidth)
            )
    }

    /// Pearl button with iridescent gradient and luminosity
    /// Matches the pearl aesthetic from HabitDetailView
    /// Usage: pearlButton(icon: "star.circle.fill", size: 60, isActive: true)
    static func pearlButton(
        icon: String,
        size: CGFloat = 80,
        isActive: Bool = true,
        luminosity: Double = 1.0
    ) -> some View {
        ZStack {
            if isActive {
                // Pearl gradient background
                Circle()
                    .fill(
                        RadialGradient(
                            gradient: Gradient(stops: [
                                .init(color: pearl, location: 0.00),
                                .init(color: pearl.opacity(0.95), location: 0.18),
                                .init(color: pearl, location: 0.55),
                                .init(color: pearl.opacity(0.85), location: 0.85),
                                .init(color: pearl.opacity(0.7), location: 1.00)
                            ]),
                            center: .init(x: 0.38, y: 0.34),
                            startRadius: 0,
                            endRadius: size / 2
                        )
                    )
                    .shadow(color: .black.opacity(0.10), radius: size * 0.15, x: 0, y: size * 0.0375)
                    .opacity(luminosity)

                // Iridescent border
                Circle()
                    .strokeBorder(
                        AngularGradient(
                            gradient: Gradient(colors: [
                                tidesLight,
                                seafoamLight,
                                pearl,
                                tidesLight
                            ]),
                            center: .center
                        ),
                        lineWidth: size * 0.025
                    )
                    .blendMode(.softLight)
                    .opacity(0.22)

                // Depth shadow
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [Color.black.opacity(0.0), Color.black.opacity(0.12)],
                            center: .center,
                            startRadius: size * 0.225,
                            endRadius: size / 2
                        )
                    )
                    .blendMode(.multiply)

                // Pearl highlight
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [Color.white.opacity(0.95), Color.white.opacity(0.0)],
                            center: .center,
                            startRadius: 0,
                            endRadius: size * 0.1375
                        )
                    )
                    .frame(width: size * 0.275, height: size * 0.275)
                    .offset(x: -size * 0.15, y: -size * 0.15)
                    .blur(radius: size * 0.03125)
                    .opacity(luminosity)

                // Icon (NO shadow)
                Image(systemName: icon)
                    .font(.system(size: size * 0.4))
                    .foregroundColor(moss)
            } else {
                // Locked state - simple gray circle
                Circle()
                    .fill(Color.gray.opacity(0.2))

                Image(systemName: icon)
                    .font(.system(size: size * 0.4))
                    .foregroundColor(.gray)
            }
        }
        .frame(width: size, height: size)
    }

    /// Pearl-themed stats card with gradient background
    /// Used for category stats and analytics displays
    /// Usage: Apply to VStack containing stats content
    static func pearlStatsCard(content: some View) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(
                        LinearGradient(
                            colors: [
                                pearl.opacity(0.1),
                                misty.opacity(0.05)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(pearl.opacity(0.3), lineWidth: 1)
                    )
            )
    }

    /// Unified pearl icon component with optional category color theming
    /// Used in HabitDetailView, CategoryDetailView, and analytics displays
    /// - Parameters:
    ///   - iconName: SF Symbol name for the icon
    ///   - categoryColor: Optional category color for angular gradient border (defaults to tides/seafoam)
    ///   - size: Pearl diameter (default 80pt)
    ///   - luminosity: Binding for animated opacity (default 1.0)
    /// - Returns: ZStack containing the complete pearl with icon
    static func pearlIcon(
        iconName: String,
        categoryColor: Color? = nil,
        size: CGFloat = 80,
        luminosity: Binding<Double>
    ) -> some View {
        ZStack {
            // Base pearl with radial gradient
            Circle()
                .fill(
                    RadialGradient(
                        gradient: Gradient(stops: [
                            .init(color: pearl, location: 0.00),
                            .init(color: pearl.opacity(0.95), location: 0.18),
                            .init(color: pearl, location: 0.55),
                            .init(color: pearl.opacity(0.85), location: 0.85),
                            .init(color: pearl.opacity(0.7), location: 1.00)
                        ]),
                        center: .init(x: 0.38, y: 0.34),
                        startRadius: 0,
                        endRadius: size / 2
                    )
                )
                .shadow(color: .black.opacity(0.10), radius: 12, x: 0, y: 3)
                .opacity(luminosity.wrappedValue)

            // Angular gradient border with category color or default
            Circle()
                .strokeBorder(
                    AngularGradient(
                        gradient: Gradient(colors:
                            categoryColor != nil ? [
                                categoryColor!.opacity(0.6),
                                categoryColor!.opacity(0.3),
                                pearl,
                                categoryColor!.opacity(0.6)
                            ] : [
                                tidesLight,
                                seafoamLight,
                                pearl,
                                tidesLight
                            ]
                        ),
                        center: .center
                    ),
                    lineWidth: 2.0
                )
                .blendMode(.softLight)
                .opacity(0.22)

            // Inner shadow for depth
            Circle()
                .fill(
                    RadialGradient(
                        colors: [Color.black.opacity(0.0), Color.black.opacity(0.12)],
                        center: .center,
                        startRadius: size * 0.45,
                        endRadius: size / 2
                    )
                )
                .blendMode(.multiply)

            // Pearl highlight
            Circle()
                .fill(
                    RadialGradient(
                        colors: [Color.white.opacity(0.95), Color.white.opacity(0.0)],
                        center: .center,
                        startRadius: 0,
                        endRadius: 11
                    )
                )
                .frame(width: 22, height: 22)
                .offset(x: -size * 0.15, y: -size * 0.15)
                .blur(radius: 2.5)
                .opacity(luminosity.wrappedValue)

            // Icon
            Image(systemName: iconName)
                .font(.system(size: size * 0.35, weight: .medium))
                .foregroundColor(moss)
                .shadow(color: .black.opacity(0.10), radius: 1, x: 0, y: 1)
        }
        .frame(width: size, height: size)
    }

    // Card Design Specifications (for reference)
    static let cardCornerRadius: CGFloat = 12
    static let cardBackgroundColor = Color.white
    static let cardShadowColor = blackShadow15.opacity(0.2)
    static let cardShadowRadius: CGFloat = 3
    static let cardShadowOffset = CGSize(width: 0, height: 1)
    static let cardBorderColor = pebble.opacity(0.70)
    static let cardBorderWidth: CGFloat = 0.25
    
    // MARK: - Dashboard Design System (Preferred Standard)
    // Based on the successful Dashboard implementation - use as reference for all views
    
    // Section Header Styling (Dashboard standard)
    static let sectionHeaderFont = Font.system(size: 16, weight: .semibold)
    static let sectionHeaderColor = Color.black  // Dashboard preferred styling
    
    // Secondary Action Buttons (Dashboard standard with pill background)
    static let dashboardSecondaryText = Color.gray  // Dashboard button text color
    static let secondaryButtonBackground = Color.gray.opacity(0.1)  // Dashboard pill background
    
    // Dashboard Spacing Standards
    static let dashboardSectionSpacing: CGFloat = 16  // Between separator and section headers
    static let dashboardContentSpacing: CGFloat = 24  // Between main content sections
    static let dashboardInternalSpacing: CGFloat = 16  // Within sections (header to content)
    
    // MARK: - Category Colors
    static func categoryColor(_ category: String?) -> Color {
        switch category {
        case "Health": return categoryHealth
        case "Fitness": return categoryFitness
        case "Learning": return categoryLearning
        case "Work": return categoryWork
        case "Personal": return categoryPersonal
        case "Mindfulness": return categoryMindfulness
        case "Creative": return categoryCreative
        case "Social": return categorySocial
        case "Spiritual": return categorySpiritual
        case "Productivity": return categoryProductivity
        default: return categoryDefault
        }
    }
    
    // MARK: - Dark Category Colors (for text/tags)
    static func darkCategoryColor(_ category: String?) -> Color {
        switch category {
        case "Health": return seafoamDark        // Health: Dark seafoam
        case "Fitness": return sunsetDark        // Fitness: Dark sunset  
        case "Learning": return lagunaDark       // Learning: Dark laguna
        case "Work": return textGray             // Work: Dark gray
        case "Personal": return twilightDark     // Personal: Dark twilight
        case "Mindfulness": return tidesDark     // Mindfulness: Dark tides
        case "Creative": return coralDark        // Creative: Dark coral
        case "Social": return topazDark          // Social: Dark topaz
        case "Spiritual": return mossDark        // Spiritual: Dark moss
        case "Productivity": return lagunaDark  // Productivity: Dark laguna
        default: return mossDark                  // Default: Dark moss
        }
    }
    
    // MARK: - Circular Navigation Buttons
    /// Standard circular navigation buttons used in navigation toolbars
    /// - X Button: 12pt xmark icon in 36x36 circle with pebble background
    /// - Save Button: 12pt checkmark icon in 36x36 circle with moss green background
    
    static var circularCloseButton: some View {
        Image(systemName: "xmark")
            .font(.system(size: 12, weight: .medium))
            .foregroundColor(ShellistDesignSystem.primaryText.opacity(0.7))
            .frame(width: 36, height: 36)
            .background(
                Circle()
                    .fill(ShellistDesignSystem.pebble.opacity(0.8))
            )
    }
    
    static var circularSaveButton: some View {
        Image(systemName: "checkmark")
            .font(.system(size: 12, weight: .medium))
            .foregroundColor(.white)
            .frame(width: 36, height: 36)
            .background(
                Circle()
                    .fill(ShellistDesignSystem.moss)
            )
    }
    
    // MARK: - Dashboard Standard Components
    /// Standard section header component based on Dashboard design
    /// Usage: DashboardSectionHeader(title: "Today's Focus", actionTitle: "Summary") { action }
    static func dashboardSectionHeader(
        title: String,
        actionTitle: String? = nil,
        action: (() -> Void)? = nil
    ) -> some View {
        HStack {
            Text(title)
                .font(sectionHeaderFont)
                .foregroundColor(sectionHeaderColor)
            
            Spacer()
            
            if let actionTitle = actionTitle, let action = action {
                Button(actionTitle, action: action)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(dashboardSecondaryText)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(secondaryButtonBackground)
                    .clipShape(Capsule())
            }
        }
    }
    
    /// Standard progress indicator pill based on Dashboard design
    /// Usage: DashboardProgressPill(text: "1 Day Streak", color: .sunset)
    static func dashboardProgressPill(
        text: String, 
        color: Color = sunset
    ) -> some View {
        Text(text)
            .font(bodySmall)
            .fontWeight(.medium)
            .foregroundColor(color)
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(color.opacity(0.1))
            .clipShape(Capsule())
    }

    /// Stats label for displaying completion percentages with icons
    /// Used for Ocean Cycle "Tide Flow" and similar completion metrics
    /// Usage: ShellistDesignSystem.statsLabel(percentage: 87, labelText: "Tide Flow", iconName: "wind")
    static func statsLabel(
        percentage: Int,
        labelText: String,
        iconName: String,
        iconColor: Color = tidesDark,
        textColor: Color = tidesDark,
        backgroundColor: Color = tidesLight
    ) -> some View {
        HStack(spacing: spacing8) {
            Image(systemName: iconName)
                .font(bodySmall)
                .foregroundColor(iconColor)

            Text("\(percentage)% \(labelText)")
                .font(bodySmall)
                .fontWeight(.medium)
                .foregroundColor(textColor)
        }
        .padding(.horizontal, spacing12)
        .padding(.vertical, 6)
        .background(
            Capsule()
                .fill(backgroundColor)
        )
    }
}

// MARK: - Add Habit Button Component
/// Unified Add Habit Button used across the entire app
/// Single source of truth for all add habit buttons (header style)
///
/// Usage:
///   - Dashboard: AddHabitButton(title: "Habits", size: .regular) { action }
///   - HabitList: AddHabitButton(title: "Add Habit", size: .compact) { action }
///
/// Features:
///   - Consistent styling across all views
///   - Built-in haptic feedback
///   - Press animations
///   - Size variants for different contexts
///   - Single source of truth for all changes
struct AddHabitButton: View {
    let title: String
    let icon: String
    let size: ShellButtonSize
    let action: () -> Void

    init(
        title: String = "Habit",
        icon: String = "plus",
        size: ShellButtonSize = .medium,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.icon = icon
        self.size = size
        self.action = action
    }
    
    var body: some View {
        Button(action: {
            action()
            HapticManager.shared.lightFeedback()
        }) {
            ZStack {
                // Shell-style background - using x60 asset with 40pt height
                Image("Shellstylebuttonx60")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(height: 40) // Proper height for x60 asset
                
                // Content overlay - centered for shell button organic shape
                HStack(spacing: 2) {
                    Image(systemName: icon)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(ShellistDesignSystem.moss)
                    
                    Text(title)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(ShellistDesignSystem.primaryText)
                }
                .offset(x: -1) // Slight horizontal adjustment for better centering in organic shell shape
            }
        }
        .buttonStyle(ShellAddHabitButtonStyle(size: size))
        .frame(minWidth: 44, minHeight: 44) // Ensure minimum touch target
    }
}

// MARK: - Shell Button Sizes
enum ShellButtonSize {
    case mini    // 40px - for compact header actions
    case small   // 50px - for standard secondary buttons
    case medium  // 60px - for standard primary buttons
    case mediumLarge // 70px - for header add buttons (40px height)
    case large   // 80px - for emphasized actions
    case xlarge  // 100px - for major CTAs
    case xxlarge // 150px - for prominent toggles
    
    var assetName: String {
        switch self {
        case .mini: return "Shellstylebuttonx40"
        case .small: return "Shellstylebuttonx50"
        case .medium: return "Shellstylebuttonx60"
        case .mediumLarge: return "Shellstylebuttonx70"
        case .large: return "Shellstylebuttonx80"
        case .xlarge: return "Shellstylebuttonx100"
        case .xxlarge: return "Shellstylebuttonx150"
        }
    }
    
    var hoverAssetName: String {
        return assetName + "-hover"
    }
    
    var width: CGFloat {
        switch self {
        case .mini: return 40
        case .small: return 50
        case .medium: return 60
        case .mediumLarge: return 70
        case .large: return 80
        case .xlarge: return 100
        case .xxlarge: return 150
        }
    }
}

// MARK: - Shell Button x180 Component
/// Large shell-style button using x180 asset, always 40pt height
/// Usage: ShellButtonX180(title: "Create Habit", icon: "plus.circle.fill") { action }
struct ShellButtonX180: View {
    let title: String
    let icon: String?
    let action: () -> Void
    let isDisabled: Bool

    @State private var isPressed = false

    init(
        title: String,
        icon: String? = nil,
        isDisabled: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.icon = icon
        self.isDisabled = isDisabled
        self.action = action
    }

    var body: some View {
        Button(action: {
            action()
            HapticManager.shared.lightFeedback()
        }) {
            ZStack {
                // Shell-style background - using x180 asset scaled to 40pt height
                Image(isPressed ? "Shellstylebuttonx180-hover" : "Shellstylebuttonx180")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(height: 40) // Consistent 40pt height

                // Content overlay
                HStack(spacing: 6) {
                    if let icon = icon {
                        Image(systemName: icon)
                            .font(ShellistDesignSystem.titleSmall)
                            .foregroundColor(isDisabled ? .gray : ShellistDesignSystem.moss)
                    }
                    Text(title)
                        .font(ShellistDesignSystem.titleSmall)
                        .foregroundColor(isDisabled ? .gray : .black)
                }
            }
        }
        .disabled(isDisabled)
        .scaleEffect(isPressed ? 0.96 : 1.0)
        .animation(.easeInOut(duration: 0.15), value: isPressed)
        .onLongPressGesture(minimumDuration: 0, maximumDistance: .infinity) { pressing in
            isPressed = pressing
        } perform: {}
        .frame(minWidth: 44, minHeight: 44) // Ensure minimum touch target
    }
}

// MARK: - Shell Button x200 Component
/// Extra large shell-style button using x200 asset, always 40pt height
/// Usage: ShellButtonX200(title: "Create Habit", icon: "plus.circle.fill") { action }
struct ShellButtonX200: View {
    let title: String
    let icon: String?
    let action: () -> Void
    let isDisabled: Bool

    @State private var isPressed = false

    init(
        title: String,
        icon: String? = nil,
        isDisabled: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.icon = icon
        self.isDisabled = isDisabled
        self.action = action
    }

    var body: some View {
        Button(action: {
            action()
            HapticManager.shared.lightFeedback()
        }) {
            ZStack {
                // Shell-style background - using x200 asset scaled to 40pt height
                Image(isPressed ? "Shellstylebuttonx200-hover" : "Shellstylebuttonx200")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(height: 40) // Consistent 40pt height

                // Content overlay
                HStack(spacing: 6) {
                    if let icon = icon {
                        Image(systemName: icon)
                            .font(ShellistDesignSystem.titleSmall)
                    }
                    Text(title)
                        .font(ShellistDesignSystem.titleSmall)
                }
                .foregroundColor(isDisabled ? .gray : ShellistDesignSystem.secondaryText)
            }
        }
        .disabled(isDisabled)
        .scaleEffect(isPressed ? 0.96 : 1.0)
        .animation(.easeInOut(duration: 0.15), value: isPressed)
        .onLongPressGesture(minimumDuration: 0, maximumDistance: .infinity) { pressing in
            isPressed = pressing
        } perform: {}
        .frame(minWidth: 44, minHeight: 44) // Ensure minimum touch target
    }
}

// MARK: - Shell Button x120 Component
/// Medium shell-style button using x120 asset, always 40pt height
/// Usage: ShellButtonX120(title: "Create Habit", icon: "plus.circle.fill") { action }
struct ShellButtonX120: View {
    let title: String
    let icon: String?
    let action: () -> Void
    let isDisabled: Bool

    @State private var isPressed = false

    init(
        title: String,
        icon: String? = nil,
        isDisabled: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.icon = icon
        self.isDisabled = isDisabled
        self.action = action
    }

    var body: some View {
        Button(action: {
            action()
            HapticManager.shared.lightFeedback()
        }) {
            ZStack {
                // Shell-style background - using x120 asset scaled to 40pt height
                Image(isPressed ? "Shellstylebuttonx120-hover" : "Shellstylebuttonx120")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(height: 40) // Consistent 40pt height

                // Content overlay
                HStack(spacing: 6) {
                    if let icon = icon {
                        Image(systemName: icon)
                            .font(ShellistDesignSystem.titleSmall)
                            .foregroundColor(isDisabled ? .gray : ShellistDesignSystem.moss)
                    }

                    Text(title)
                        .font(ShellistDesignSystem.titleSmall)
                        .foregroundColor(isDisabled ? .gray : .black)
                }
            }
        }
        .disabled(isDisabled)
        .scaleEffect(isPressed ? 0.96 : 1.0)
        .animation(.easeInOut(duration: 0.15), value: isPressed)
        .onLongPressGesture(minimumDuration: 0, maximumDistance: .infinity) { pressing in
            isPressed = pressing
        } perform: {}
        .frame(minWidth: 44, minHeight: 44) // Ensure minimum touch target
    }
}

// MARK: - Sand Emblem Button
/// Sand emblem style button that looks like a print pressed into sand
struct SandEmblemButton: View {
    let title: String
    let icon: String?
    let action: () -> Void

    @State private var isPressed = false

    var body: some View {
        Button(action: {
            action()
            HapticManager.shared.lightFeedback()
        }) {
            HStack(spacing: 8) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(ShellistDesignSystem.moss)
                }

                Text(title)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.black)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(
                        LinearGradient(
                            colors: [
                                Color(white: 0.92),
                                Color(white: 0.88),
                                Color(white: 0.85)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(
                                LinearGradient(
                                    colors: [
                                        Color(white: 0.8),
                                        Color(white: 0.7)
                                    ],
                                    startPoint: .top,
                                    endPoint: .bottom
                                ),
                                lineWidth: 1
                            )
                    )
                    .overlay(
                        // Inner shadow effect
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.white.opacity(0.6), lineWidth: 1)
                            .blur(radius: 1)
                            .offset(x: -1, y: -1)
                            .mask(RoundedRectangle(cornerRadius: 12))
                    )
                    .overlay(
                        // Inner dark shadow
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.black.opacity(0.2), lineWidth: 1)
                            .blur(radius: 1)
                            .offset(x: 1, y: 1)
                            .mask(RoundedRectangle(cornerRadius: 12))
                    )
            )
        }
        .scaleEffect(isPressed ? 0.95 : 1.0)
        .animation(.easeInOut(duration: 0.1), value: isPressed)
        .onLongPressGesture(minimumDuration: 0, maximumDistance: .infinity) { pressing in
            isPressed = pressing
        } perform: {}
    }
}

// MARK: - Shell Add Habit Button Style
/// Shell-style button with hover/press state management using SVG assets
struct ShellAddHabitButtonStyle: ButtonStyle {
    let size: ShellButtonSize
    
    @State private var isHovered = false
    
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .background(
                // Use hover asset when pressed - x60 with 40pt height
                Image(configuration.isPressed ? "Shellstylebuttonx60-hover" : "Shellstylebuttonx60")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(height: 40)
            )
            .scaleEffect(configuration.isPressed ? 0.96 : 1.0)
            .animation(.easeInOut(duration: 0.15), value: configuration.isPressed)
    }
}

// MARK: - Pearl Quick Access Add Habit Button
/// Pearl-style Add Habit Button for QuickAccess overlay
/// 
/// Features:
/// - Pearl.svg base with background fill (#F2F0E6)
/// - Subtle border (#E0E0E0 at 50% opacity)
/// - Gray plus icon (#E0E0E0)
/// - Press scale animation (95%)
/// - Customizable callback action
///
/// Usage:
/// ```swift
/// PearlAddHabitButton { 
///     // Handle add habit action
/// }
/// ```
struct PearlAddHabitButton: View {
    @State private var isPressed = false
    @State private var pearlLuminosity: Double = 1.0
    let onCreateHabit: () -> Void
    
    init(onCreateHabit: @escaping () -> Void = {}) {
        self.onCreateHabit = onCreateHabit
    }
    
    var body: some View {
        VStack(spacing: 8) {
            ZStack {
                Circle()
                    .fill(
                        RadialGradient(
                            stops: [
                                .init(color: ShellistDesignSystem.pearl, location: 0.00),
                                .init(color: ShellistDesignSystem.pearl.opacity(0.95), location: 0.18),
                                .init(color: ShellistDesignSystem.pearl, location: 0.55),
                                .init(color: ShellistDesignSystem.pearl.opacity(0.85), location: 0.85),
                                .init(color: ShellistDesignSystem.pearl.opacity(0.7), location: 1.00)
                            ],
                            center: .init(x: 0.38, y: 0.34),
                            startRadius: 1,
                            endRadius: 30
                        )
                    )
                    .frame(width: 60, height: 60)
                    .opacity(pearlLuminosity)
                    .overlay(
                        Circle()
                            .stroke(ShellistDesignSystem.pebble, lineWidth: 1.0)
                    )
                
                Image(systemName: "plus")
                    .font(ShellistDesignSystem.titleMedium)
                    .foregroundColor(ShellistDesignSystem.moss)
            }
            .scaleEffect(isPressed ? 0.95 : 1.0)
            .opacity(isPressed ? 0.8 : 1.0)
            .animation(.easeInOut(duration: 0.15), value: isPressed)
            
            // Shorter text to match other habits
            Text("Add")
                .font(ShellistDesignSystem.bodySmall)
                .foregroundColor(ShellistDesignSystem.darkTextGray)
                .multilineTextAlignment(.center)
                .lineLimit(1)
        }
        .onTapGesture {
            HapticManager.shared.lightFeedback()
            onCreateHabit()
        }
        .onLongPressGesture(minimumDuration: 0, maximumDistance: .infinity) { pressing in
            isPressed = pressing
        } perform: {}
        .task {
            // Start gentle pearl luminosity pulse (0.8 to 1.0 opacity over 2.5s)
            withAnimation(.easeInOut(duration: 2.5).repeatForever(autoreverses: true)) {
                pearlLuminosity = 0.8
            }
        }
        .accessibilityLabel("Add new habit")
        .accessibilityHint("Double tap to create a new habit")
        .accessibilityAddTraits(.isButton)
    }
}


extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let alpha, red, green, blue: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (alpha, red, green, blue) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (alpha, red, green, blue) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (alpha, red, green, blue) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (alpha, red, green, blue) = (255, 0, 0, 0)
        }

        self.init(
            .sRGB,
            red: Double(red) / 255,
            green: Double(green) / 255,
            blue: Double(blue) / 255,
            opacity: Double(alpha) / 255
        )
    }
}

// MARK: - Toggle Design Component
/// Unified toggle design used across the app for • Option A | Option B • style
/// Single source of truth for all toggle components
///
/// Usage:
///   - HabitListView: • Week | Month •
///   - Settings modals: • Option A | Option B •
///
/// Features:
///   - Consistent font size and weight (14pt, semibold)
///   - Dot indicators with proper spacing
///   - Active/inactive color states
///   - Built-in haptic feedback
///   - Rounded background with stroke
struct ToggleDesign<T: Hashable>: View {
    @Binding var selection: T
    let options: [(value: T, label: String)]
    let action: ((T) -> Void)?
    let size: ToggleSize
    let spacing: CGFloat
    let dotPadding: CGFloat
    let leadingDotPadding: CGFloat

    init(
        selection: Binding<T>,
        options: [(value: T, label: String)],
        action: ((T) -> Void)? = nil,
        size: ToggleSize = .medium,
        spacing: CGFloat = 0,
        dotPadding: CGFloat = 0,
        leadingDotPadding: CGFloat = 0
    ) {
        self._selection = selection
        self.options = options
        self.action = action
        self.size = size
        self.spacing = spacing
        self.dotPadding = dotPadding
        self.leadingDotPadding = leadingDotPadding
    }
    
    var body: some View {
        ZStack {
            // Shell-style background using configurable asset - FORCED 40pt height
            // Use .fit to maintain proper aspect ratio for organic shell shapes
            Image(size.assetName)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(height: 40)
                .clipped()

            // Content overlay - positioned for proper alignment within organic shell shape
            HStack(spacing: spacing) {
                ForEach(Array(options.enumerated()), id: \.offset) { index, option in
                    // Add divider before non-first options
                    if index > 0 {
                        Rectangle()
                            .fill(ShellistDesignSystem.pearlGray)
                            .frame(width: 1, height: 16)
                    }

                    Button {
                        withAnimation(.easeInOut(duration: 0.3)) {
                            selection = option.value
                        }
                        action?(option.value)
                        HapticManager.shared.lightFeedback()
                    } label: {
                        HStack(spacing: 6) {
                            // Leading dot for first option
                            if index == 0 {
                                Circle()
                                    .fill(selection == option.value ? ShellistDesignSystem.lightBrown : ShellistDesignSystem.pearlGray)
                                    .frame(width: 8, height: 8)
                            }

                            // Add clock icon for "All" option
                            if option.label == "All" {
                                HStack(spacing: 4) {
                                    Image(systemName: selection == option.value ? "clock.fill" : "clock")
                                        .font(.system(size: 12, weight: .medium))
                                        .foregroundColor(selection == option.value ? ShellistDesignSystem.lightBrown : ShellistDesignSystem.secondaryText)
                                    Text(option.label)
                                        .font(.system(size: 14, weight: .semibold))
                                        .foregroundColor(selection == option.value ? ShellistDesignSystem.lightBrown : ShellistDesignSystem.secondaryText)
                                }
                            } else {
                                Text(option.label)
                                    .font(.system(size: 14, weight: .semibold))
                                    .foregroundColor(selection == option.value ? ShellistDesignSystem.lightBrown : ShellistDesignSystem.secondaryText)
                            }

                            // Trailing dot for last option
                            if index == options.count - 1 {
                                Circle()
                                    .fill(selection == option.value ? ShellistDesignSystem.lightBrown : ShellistDesignSystem.pearlGray)
                                    .frame(width: 8, height: 8)
                            }
                        }
                        .padding(.horizontal, 12)
                        .padding(.vertical, 12)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
            .padding(.horizontal, size.horizontalPadding) // Size-aware horizontal padding for shell buttons
            .padding(.leading, size.leadingPadding - size.horizontalPadding) // Additional leading padding for organic shell curves
        }
    }
}

// MARK: - Toggle Size Options
enum ToggleSize {
    case small   // x100 shell button
    case medium  // x120 shell button (default)
    case x130    // x130 shell button
    case large   // x140 shell button
    case x150    // x150 shell button
    case x160    // x160 shell button
    case x170    // x170 shell button
    case xlarge  // x180 shell button
    case xxlarge // x200 shell button

    var assetName: String {
        switch self {
        case .small: return "Shellstylebuttonx100"
        case .medium: return "Shellstylebuttonx120"
        case .x130: return "Shellstylebuttonx130"
        case .large: return "Shellstylebuttonx140"
        case .x150: return "Shellstylebuttonx150"
        case .x160: return "Shellstylebuttonx160"
        case .x170: return "Shellstylebuttonx170"
        case .xlarge: return "Shellstylebuttonx180"
        case .xxlarge: return "Shellstylebuttonx200"
        }
    }

    // Size-aware padding for organic shell button shapes
    var horizontalPadding: CGFloat {
        switch self {
        case .small: return 8
        case .medium: return 12
        case .x130: return 13
        case .large: return 14
        case .x150: return 16
        case .x160: return 17
        case .x170: return 18
        case .xlarge: return 20
        case .xxlarge: return 24
        }
    }

    // Leading edge padding to account for shell button curves
    var leadingPadding: CGFloat {
        switch self {
        case .small: return 10
        case .medium: return 14
        case .x130: return 15
        case .large: return 16
        case .x150: return 18
        case .x160: return 19
        case .x170: return 20
        case .xlarge: return 22
        case .xxlarge: return 26
        }
    }

    // Universal escape margin for consistent shell button alignment
    // All shell buttons start from the same content border position (20pt from screen edge)
    // regardless of their internal size (.medium, .xlarge, etc.)
    static var universalEscapeMargin: CGFloat {
        return ShellistDesignSystem.pageHorizontalMargin // 20pt - simple and consistent
    }

    // Size-specific escape margin to align different sized shell buttons at same left position
    var sizeSpecificEscapeMargin: CGFloat {
        // Reduce escape margin to prevent button cropping while maintaining alignment
        let baseEscape = ShellistDesignSystem.pageHorizontalMargin // 20pt
        let xlargeHorizontalPadding: CGFloat = 20 // .xlarge horizontal padding
        let additionalOffset = self.horizontalPadding - xlargeHorizontalPadding // FIXED: Smaller buttons need MORE negative margin
        let calculatedMargin = baseEscape + additionalOffset
        // Ensure minimum escape margin to prevent cropping
        return max(calculatedMargin, 8) // Don't go below 8pt to avoid clipping
    }
}

// MARK: - Progress Ring Component
/// Unified progress ring component with consistent styling and shell/pearl theme
/// Single source of truth for all progress indicators across the app
///
/// Usage:
///   - Dashboard: ShellistProgressRing(progress: 0.75, style: .dashboard(size: .medium))
///   - Ocean Cycle: ShellistProgressRing(progress: 0.45, style: .ocean)
///   - Timer: ShellistProgressRing(progress: timerProgress, style: .metric(color: .sunset))
///
/// Features:
///   - Consistent stroke widths and styling
///   - Shell/pearl theme integration with shimmer effects
///   - VoiceOver accessibility support
///   - Smooth animations with performance optimization
///   - Size variants for different contexts
struct ShellistProgressRing: View {
    let progress: Double
    let style: ProgressRingStyle
    let showShimmer: Bool
    let isAnimated: Bool

    @State private var animatedProgress: Double = 0
    @State private var shimmerOffset: CGFloat = -1

    init(
        progress: Double,
        style: ProgressRingStyle,
        showShimmer: Bool = false,
        isAnimated: Bool = true
    ) {
        self.progress = max(0, min(1, progress))
        self.style = style
        self.showShimmer = showShimmer
        self.isAnimated = isAnimated
    }

    var body: some View {
        ZStack {
            // Background ring
            Circle()
                .stroke(
                    style.backgroundColor,
                    style: StrokeStyle(
                        lineWidth: style.strokeWidth,
                        lineCap: .round
                    )
                )

            // Progress ring
            Circle()
                .trim(from: 0, to: animatedProgress)
                .stroke(
                    style.foregroundGradient,
                    style: StrokeStyle(
                        lineWidth: style.strokeWidth,
                        lineCap: .round
                    )
                )
                .rotationEffect(.degrees(-90))
                .overlay(
                    // Pearl shimmer effect
                    Group {
                        if showShimmer && animatedProgress > 0.1 {
                            Circle()
                                .trim(from: max(0, shimmerOffset - 0.1), to: min(animatedProgress, shimmerOffset + 0.1))
                                .stroke(
                                    LinearGradient(
                                        colors: [
                                            Color.white.opacity(0),
                                            Color.white.opacity(0.8),
                                            Color.white.opacity(0)
                                        ],
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    ),
                                    style: StrokeStyle(
                                        lineWidth: style.strokeWidth * 0.8,
                                        lineCap: .round
                                    )
                                )
                                .rotationEffect(.degrees(-90))
                        }
                    }
                )
        }
        .frame(width: style.size, height: style.size)
        .onAppear {
            if isAnimated {
                withAnimation(.easeOut(duration: 1.0)) {
                    animatedProgress = progress
                }
            } else {
                animatedProgress = progress
            }

            if showShimmer {
                withAnimation(.linear(duration: 2.0).repeatForever(autoreverses: false)) {
                    shimmerOffset = 1.2
                }
            }
        }
        .onChange(of: progress) { newProgress in
            if isAnimated {
                withAnimation(.easeInOut(duration: 0.3)) {
                    animatedProgress = newProgress
                }
            } else {
                animatedProgress = newProgress
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Progress ring")
        .accessibilityValue("\(Int(progress * 100)) percent complete")
        .accessibilityAddTraits(.updatesFrequently)
    }
}

// MARK: - Shell Button Frame Wrapper
/// Wrapper that positions shell buttons at the screen edge by escaping parent container padding
/// Usage: ShellButtonFrame(escapeMargin: 20) { ToggleDesign(...) }
struct ShellButtonFrame<Content: View>: View {
    let content: Content
    let alignment: Alignment
    let escapeMargin: CGFloat
    let showDebugAlignment: Bool

    init(
        alignment: Alignment = .leading,
        escapeMargin: CGFloat = ToggleSize.universalEscapeMargin,
        showDebugAlignment: Bool = false,
        @ViewBuilder content: () -> Content
    ) {
        self.alignment = alignment
        self.escapeMargin = escapeMargin
        self.showDebugAlignment = showDebugAlignment
        self.content = content()
    }

    var body: some View {
        HStack {
            content
                .frame(maxWidth: .infinity, alignment: alignment)
        }
        .frame(maxWidth: .infinity, alignment: alignment)
        .padding(.horizontal, -escapeMargin) // Negative margin to reach screen edge
        #if DEBUG
        .overlay(
            // Debug alignment guide - shows target 20pt line from screen edge
            Group {
                if showDebugAlignment {
                    GeometryReader { geometry in
                        Rectangle()
                            .stroke(Color.red, lineWidth: 2)
                            .frame(width: 2, height: 44)
                            .position(x: 20, y: geometry.size.height / 2)
                            .opacity(0.7)
                    }
                }
            }
        )
        #endif
    }
}

// MARK: - Progress Ring Styles
enum ProgressRingStyle {
    case dashboard(size: ProgressRingSize = .medium)
    case ocean
    case moss
    case metric(color: Color)
    case timer

    var size: CGFloat {
        switch self {
        case .dashboard(let ringSize):
            return ringSize.diameter
        case .ocean:
            return ProgressRingSize.large.diameter
        case .moss:
            return ProgressRingSize.medium.diameter
        case .metric:
            return ProgressRingSize.small.diameter
        case .timer:
            return ProgressRingSize.large.diameter
        }
    }

    var strokeWidth: CGFloat {
        switch self {
        case .dashboard:
            return 3.0
        case .ocean:
            return 4.0
        case .moss:
            return 3.0
        case .metric:
            return 2.5
        case .timer:
            return 4.0
        }
    }

    var backgroundColor: Color {
        switch self {
        case .dashboard:
            return ShellistDesignSystem.pebble.opacity(0.3)
        case .ocean:
            return ShellistDesignSystem.tidesMedium.opacity(0.2)
        case .moss:
            return ShellistDesignSystem.mossMedium.opacity(0.2)
        case .metric:
            return ShellistDesignSystem.pebble.opacity(0.2)
        case .timer:
            return ShellistDesignSystem.pebble.opacity(0.3)
        }
    }

    var foregroundGradient: AngularGradient {
        switch self {
        case .dashboard:
            return AngularGradient(
                colors: [
                    ShellistDesignSystem.sunsetDark,
                    ShellistDesignSystem.sunsetMedium,
                    ShellistDesignSystem.sunsetDark
                ],
                center: .center,
                startAngle: .degrees(0),
                endAngle: .degrees(360)
            )
        case .ocean:
            return AngularGradient(
                colors: [
                    ShellistDesignSystem.tidesDark,
                    ShellistDesignSystem.tidesMedium,
                    ShellistDesignSystem.tidesDark
                ],
                center: .center,
                startAngle: .degrees(0),
                endAngle: .degrees(360)
            )
        case .moss:
            return AngularGradient(
                colors: [
                    ShellistDesignSystem.mossDark,
                    ShellistDesignSystem.mossMedium,
                    ShellistDesignSystem.mossDark
                ],
                center: .center,
                startAngle: .degrees(0),
                endAngle: .degrees(360)
            )
        case .metric(let color):
            return AngularGradient(
                colors: [color, color.opacity(0.7), color],
                center: .center,
                startAngle: .degrees(0),
                endAngle: .degrees(360)
            )
        case .timer:
            return AngularGradient(
                colors: [
                    ShellistDesignSystem.sunsetDark,
                    ShellistDesignSystem.coralDark,
                    ShellistDesignSystem.sunsetDark
                ],
                center: .center,
                startAngle: .degrees(0),
                endAngle: .degrees(360)
            )
        }
    }
}

// MARK: - Progress Ring Sizes
enum ProgressRingSize {
    case small   // 32pt - for inline metrics
    case medium  // 50pt - for standard dashboard cards
    case large   // 70pt - for emphasis areas like Ocean Cycle
    case custom(CGFloat)

    var diameter: CGFloat {
        switch self {
        case .small: return 32
        case .medium: return 50
        case .large: return 70
        case .custom(let size): return size
        }
    }
}

class HapticManager {
    static let shared = HapticManager()

    private init() {}

    func successFeedback() {
        let impactFeedback = UIImpactFeedbackGenerator(style: .medium)
        impactFeedback.impactOccurred()
    }

    func lightFeedback() {
        let impactFeedback = UIImpactFeedbackGenerator(style: .light)
        impactFeedback.impactOccurred()
    }

    func errorFeedback() {
        let impactFeedback = UIImpactFeedbackGenerator(style: .heavy)
        impactFeedback.impactOccurred()
    }

    func notificationFeedback(type: UINotificationFeedbackGenerator.FeedbackType) {
        let notificationFeedback = UINotificationFeedbackGenerator()
        notificationFeedback.notificationOccurred(type)
    }

    func mediumFeedback() {
        let impactFeedback = UIImpactFeedbackGenerator(style: .medium)
        impactFeedback.impactOccurred()
    }

    func heavyFeedback() {
        let impactFeedback = UIImpactFeedbackGenerator(style: .heavy)
        impactFeedback.impactOccurred()
    }

    func warningFeedback() {
        let notificationFeedback = UINotificationFeedbackGenerator()
        notificationFeedback.notificationOccurred(.warning)
    }

    func layeredSuccessFeedback() {
        // Layered haptic sequence for premium shell interaction
        let lightImpact = UIImpactFeedbackGenerator(style: .light)
        let mediumImpact = UIImpactFeedbackGenerator(style: .medium)

        // Initial touch
        lightImpact.impactOccurred()

        // Build up
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            mediumImpact.impactOccurred()
        }

        // Success completion
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            let successFeedback = UINotificationFeedbackGenerator()
            successFeedback.notificationOccurred(.success)
        }
    }
}

// MARK: - Vision Board Customization

/// Pin/tape styles for Polaroid vision cards
enum VisionPinStyle: String, CaseIterable {
    case circlePin = "circle"
    case washiTape = "washi"
    case pearlPin = "pearl"
    case squareTape = "square"

    var assetName: String {
        switch self {
        case .circlePin: return "VisionPinCircle"
        case .washiTape: return "VisionTapeWashi"
        case .pearlPin: return "VisionPinPearl"
        case .squareTape: return "VisionTapeSquare"
        }
    }

    var displayName: String {
        switch self {
        case .circlePin: return "Circle Pin"
        case .washiTape: return "Washi Tape"
        case .pearlPin: return "Pearl Pin"
        case .squareTape: return "Square Tape"
        }
    }

    var tintColor: Color {
        switch self {
        case .circlePin: return ShellistDesignSystem.topazMedium // Brass/gold
        case .washiTape: return ShellistDesignSystem.moss // Green tape
        case .pearlPin: return ShellistDesignSystem.pearl // Pearl white
        case .squareTape: return ShellistDesignSystem.sand // Beige tape
        }
    }
}

/// Sticker types for vision card decoration
enum VisionStickerType: String, CaseIterable {
    case heart
    case shell
    case counchShell
    case starfish
    case sun
    case bow

    var displayName: String {
        switch self {
        case .heart: return "Heart"
        case .shell: return "Shell"
        case .counchShell: return "Counch Shell"
        case .starfish: return "Starfish"
        case .sun: return "Sun"
        case .bow: return "Bow"
        }
    }

    var assetName: String {
        switch self {
        case .heart: return "VisionStickerHeart"
        case .shell: return "VisionStickerShell"
        case .counchShell: return "VisionStickerCounchShell"
        case .starfish: return "VisionStickerStarfish"
        case .sun: return "VisionStickerSun"
        case .bow: return "VisionStickerBow"
        }
    }
}

extension ShellistDesignSystem {
    /// Handwritten font for Polaroid captions and vision board elements
    static let handwrittenFont = Font.custom("Bradley Hand", size: 14)
    static let handwrittenFontBold = Font.custom("Bradley Hand Bold", size: 14)
    static let handwrittenTitleFont = Font.custom("Bradley Hand", size: 18)
}


