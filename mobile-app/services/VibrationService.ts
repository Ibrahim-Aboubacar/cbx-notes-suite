// services/VibrationService.ts
import * as Haptics from 'expo-haptics';

/**
 * Vibration & Haptic Feedback Utility
 * -----------------------------------
 * Provides a clean API for triggering device vibrations / haptic feedback.
 * Works on iOS & Android (if hardware supports haptics).
 */
export const VibrationService = {
    /**
     * Trigger a light, soft impact feedback.
     */
    softImpact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),

    /**
     * Trigger a medium strength impact feedback.
     */
    mediumImpact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),

    /**
     * Trigger a strong / heavy impact feedback.
     */
    heavyImpact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),

    /**
     * Trigger a rigid impact feedback (short, sharp).
     */
    rigidImpact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),

    /**
     * Trigger a flexible impact feedback (softer version of soft).
     */
    lightImpact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

    /**
     * Trigger a "success" notification feedback.
     */
    success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),

    /**
     * Trigger a "warning" notification feedback.
     */
    warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),

    /**
     * Trigger an "error" notification feedback.
     */
    error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),

    /**
     * Trigger a selection change feedback (light, quick tap).
     */
    selectionChange: () => Haptics.selectionAsync(),
};
