import { it, expect } from "vitest";
import { parse } from "./translationReferenceMatcher.js";

it("should not match i18n functions", async () => {
  const sourceCode = `
   templ SignUpPage() {
	@layout.HtmlLayout() {
		<div class={ container() }>
			@SignUpForm()
			<div id="error"></div>
			<p>{ i18n.T(ctx, "auth.alreadyHaveAccount") } <a color-red href="/sign-in">{ i18n.T(ctx, "auth.signIn!") }</a></p>
		</div>
	}
}
    `;
  const matches = parse(sourceCode);
  expect(matches).toHaveLength(2);
});

it("should not match a string without a i18n function", async () => {
  const sourceCode = `
   templ SignInPage() {
	@layout.HtmlLayout() {
		<div class={ container() }>
			@SignInForm()
			<p>Don't have an account? <a color-red href="/sign-up">Sign up!</a></p>
		</div>
	}
}
    `;
  const matches = parse(sourceCode);
  expect(matches).toHaveLength(0);
});

it("should match a string with a i18n function", async () => {
  const sourceCode = `
     func SignInHandler() {
      title := i18n.T(ctx, "auth.signIn!")
  }
      `;
  const matches = parse(sourceCode);
  expect(matches).toHaveLength(1);
});
