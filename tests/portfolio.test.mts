import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { PROJECTS } from "../lib/data/projects.ts";
import { WORK_EXPERIENCE, SPEAKING } from "../lib/data/speaking.ts";
import { ABOUT_EDUCATION, ABOUT_FOCUS_TAGS } from "../lib/data/about.ts";
import { TECH_STACK_CATEGORIES } from "../lib/data/skills.ts";
import { NAV_LINKS } from "../lib/data/nav.ts";
import { processContactSubmission } from "../lib/contact.ts";

const ROOT = path.resolve(import.meta.dirname, "..");

test("curated projects have unique slugs, valid architecture schemas, and existing local assets", () => {
  assert.ok(PROJECTS.length >= 6, "Expected curated flagship projects");

  const slugs = new Set<string>();
  for (const project of PROJECTS) {
    assert.ok(project.slug.length > 0, "Project slug must be non-empty");
    assert.ok(!slugs.has(project.slug), `Duplicate project slug: ${project.slug}`);
    slugs.add(project.slug);

    assert.ok(project.name.length > 0, `Missing name for ${project.slug}`);
    assert.ok(project.details.contributions.length >= 3, `Expected >=3 contributions for ${project.slug}`);
    assert.ok(project.details.architecture, `Missing architecture blueprint for ${project.slug}`);
    assert.ok(
      project.details.architecture.tables.length >= 1,
      `Expected at least 1 schema table for ${project.slug}`
    );

    if (project.image) {
      const publicPath = path.join(ROOT, "public", project.image.replace(/^\//, ""));
      assert.ok(fs.existsSync(publicPath), `Missing image asset on disk: ${publicPath}`);
    }

    assert.ok(!project.name.includes("\u2014"), `Em dash forbidden in ${project.slug} name`);
    assert.ok(!project.description.includes("\u2014"), `Em dash forbidden in ${project.slug} description`);
  }
});

test("resume, education, work experience, and tech stack data match expected structure", () => {
  assert.ok(fs.existsSync(path.join(ROOT, "public", "CV_Faiz_Arfian.pdf")), "CV PDF asset must exist");
  assert.ok(fs.existsSync(path.join(ROOT, "public", "foto.jpeg")), "Profile photo must exist");

  assert.ok(ABOUT_EDUCATION.length >= 2);
  assert.ok(ABOUT_FOCUS_TAGS.length >= 4);
  assert.ok(WORK_EXPERIENCE.length >= 2);
  assert.ok(SPEAKING.length >= 2);
  assert.equal(TECH_STACK_CATEGORIES.length, 3);
  assert.ok(NAV_LINKS.length >= 4);
});

test("processContactSubmission validates fields and Turnstile token cleanly", async () => {
  const shortName = await processContactSubmission(
    { name: "A", message: "Halo saya butuh bantuan proyek", token: "tok" },
    { NODE_ENV: "production", CLOUDFLARE_TURNSTILE_SECRET: "secret" }
  );
  assert.equal(shortName.status, 400);
  assert.equal(shortName.success, false);

  const missingToken = await processContactSubmission(
    { name: "Budi Santoso", message: "Halo saya tertarik diskusi proyek web" },
    { NODE_ENV: "production", CLOUDFLARE_TURNSTILE_SECRET: "secret" }
  );
  assert.equal(missingToken.status, 400);
  assert.equal(missingToken.success, false);

  const missingProdSecret = await processContactSubmission(
    { name: "Budi Santoso", message: "Halo saya tertarik diskusi proyek web", token: "valid-token" },
    { NODE_ENV: "production" }
  );
  assert.equal(missingProdSecret.status, 503);
  assert.equal(missingProdSecret.success, false);

  const rejectedTurnstile = await processContactSubmission(
    { name: "Budi Santoso", message: "Halo saya tertarik diskusi proyek web", token: "bad-token" },
    { NODE_ENV: "production", CLOUDFLARE_TURNSTILE_SECRET: "secret" },
    async () =>
      new Response(JSON.stringify({ success: false, "error-codes": ["invalid-input-response"] }), {
        status: 200,
      })
  );
  assert.equal(rejectedTurnstile.status, 403);
  assert.equal(rejectedTurnstile.success, false);

  const fallbackMailtoPass = await processContactSubmission(
    { name: "Budi Santoso", message: "Halo saya tertarik diskusi proyek web", token: "good-token" },
    { NODE_ENV: "production", CLOUDFLARE_TURNSTILE_SECRET: "secret" },
    async () => new Response(JSON.stringify({ success: true }), { status: 200 })
  );
  assert.equal(fallbackMailtoPass.status, 200);
  assert.equal(fallbackMailtoPass.success, true);
  assert.equal(fallbackMailtoPass.deliveredDirectly, false);
});
