<script setup lang="ts">
import { reactive, ref } from "vue";

const PROJECT_TYPES = [
  "Custom Software Development",
  "Web Application",
  "Mobile App",
  "Website",
  "IT Consultancy",
  "System Integration",
  "API Integration",
  "Maintenance & Support",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string | undefined;

const form = reactive({
  name: "",
  email: "",
  projectType: "",
  message: "",
});

const errors = reactive<Record<string, string>>({});
const status = ref<Status>("idle");
const statusMessage = ref("");
const botcheck = ref(false);

function validate() {
  errors.name = form.name.trim() ? "" : "Please tell us your name.";
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : "Enter a valid email address.";
  errors.projectType = form.projectType ? "" : "Select a project type.";
  errors.message = form.message.trim().length >= 10 ? "" : "Give us a few more details (10+ characters).";
  return Object.values(errors).every((e) => !e);
}

async function onSubmit() {
  if (!validate()) return;
  if (botcheck.value) return;

  status.value = "submitting";
  statusMessage.value = "";

  if (!WEB3FORMS_ACCESS_KEY) {
    status.value = "error";
    statusMessage.value = "Form is not configured yet — missing Web3Forms access key.";
    return;
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New project inquiry — ${form.projectType}`,
        from_name: "Kodify Digital website",
        name: form.name,
        email: form.email,
        project_type: form.projectType,
        message: form.message,
        botcheck: botcheck.value,
      }),
    });

    const data = await res.json();

    if (data.success) {
      status.value = "success";
      statusMessage.value = "Thanks — we'll get back to you within 1–2 business days.";
      form.name = "";
      form.email = "";
      form.projectType = "";
      form.message = "";
    } else {
      throw new Error(data.message || "Submission failed.");
    }
  } catch (err) {
    status.value = "error";
    statusMessage.value = "Something went wrong sending your message. Please email us directly.";
  }
}
</script>

<template>
  <form novalidate class="flex flex-col gap-7" @submit.prevent="onSubmit">
    <input
      v-model="botcheck"
      type="checkbox"
      name="botcheck"
      class="hidden"
      style="display: none"
      tabindex="-1"
      autocomplete="off"
    />

    <div class="grid gap-7 sm:grid-cols-2">
      <label class="flex flex-col gap-2">
        <span class="font-mono text-xs uppercase tracking-[0.14em] text-paper/50">Name</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          placeholder="Your full name"
          class="rounded-lg border border-ink-line bg-ink-soft px-4 py-3.5 text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-signal"
          :aria-invalid="!!errors.name"
        />
        <span v-if="errors.name" class="text-xs text-ember">{{ errors.name }}</span>
      </label>

      <label class="flex flex-col gap-2">
        <span class="font-mono text-xs uppercase tracking-[0.14em] text-paper/50">Email</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="you@company.com"
          class="rounded-lg border border-ink-line bg-ink-soft px-4 py-3.5 text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-signal"
          :aria-invalid="!!errors.email"
        />
        <span v-if="errors.email" class="text-xs text-ember">{{ errors.email }}</span>
      </label>
    </div>

    <label class="flex flex-col gap-2">
      <span class="font-mono text-xs uppercase tracking-[0.14em] text-paper/50">Project type</span>
      <div class="relative">
        <select
          v-model="form.projectType"
          name="project_type"
          class="w-full appearance-none rounded-lg border border-ink-line bg-ink-soft px-4 py-3.5 text-paper outline-none transition-colors focus:border-signal"
          :aria-invalid="!!errors.projectType"
        >
          <option value="" disabled>Select a project type</option>
          <option v-for="type in PROJECT_TYPES" :key="type" :value="type">{{ type }}</option>
        </select>
        <svg
          class="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-paper/40"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <span v-if="errors.projectType" class="text-xs text-ember">{{ errors.projectType }}</span>
    </label>

    <label class="flex flex-col gap-2">
      <span class="font-mono text-xs uppercase tracking-[0.14em] text-paper/50">Message</span>
      <textarea
        v-model="form.message"
        name="message"
        rows="5"
        placeholder="Tell us a bit about what you're building..."
        class="resize-none rounded-lg border border-ink-line bg-ink-soft px-4 py-3.5 text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-signal"
        :aria-invalid="!!errors.message"
      ></textarea>
      <span v-if="errors.message" class="text-xs text-ember">{{ errors.message }}</span>
    </label>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="submit"
        :disabled="status === 'submitting'"
        class="inline-flex items-center justify-center gap-3 rounded-full bg-signal px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-opacity disabled:opacity-60"
      >
        {{ status === "submitting" ? "Sending..." : "Send Message" }}
        <svg v-if="status !== 'submitting'" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 13 13 1M13 1H4M13 1v9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <p
        v-if="statusMessage"
        role="status"
        aria-live="polite"
        :class="['text-sm', status === 'success' ? 'text-signal' : 'text-ember']"
      >
        {{ statusMessage }}
      </p>
    </div>
  </form>
</template>
