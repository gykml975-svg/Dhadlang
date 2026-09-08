package org.dhadlang.android;

import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.matcher.ViewMatchers.withText;
import static androidx.test.espresso.assertion.ViewAssertions.matches;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.rule.ActivityTestRule;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class MainActivityTest {
    @Rule public ActivityTestRule<MainActivity> rule = new ActivityTestRule<>(MainActivity.class);

    @Test public void launchesWithArabicEditorUi() {
        onView(withText("ضاد")).check(matches(androidx.test.espresso.matcher.ViewMatchers.isDisplayed()));
        onView(withText("تشغيل")).check(matches(androidx.test.espresso.matcher.ViewMatchers.isDisplayed()));
    }

    @Test public void showsWelcomeOrEditorWithoutCrash() {
        onView(withText("مشروعي")).check(matches(androidx.test.espresso.matcher.ViewMatchers.isDisplayed()));
    }
}
