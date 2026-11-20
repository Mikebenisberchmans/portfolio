import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { InstagramIcon, LinkedInIcon } from "../atoms/SocialIcons";
import { github } from "../../assets";

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

// Messages are delivered to this inbox through FormSubmit (no account or API
// keys needed). The very first message triggers a one-time confirmation email
// from FormSubmit to this address: click "Activate" in it and every message
// after that lands in the inbox.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${config.html.email}`;

const socialLinkClass =
  "black-gradient flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_22px_rgba(145,94,255,0.55)]";

const Contact = () => {
  const formRef = useRef<React.LegacyRef<HTMLFormElement> | undefined>();
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    if (e === undefined) return;
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email,
          _subject: `New portfolio message from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || (data && String(data.success) === "false")) {
        throw new Error(data?.message ?? `Request failed (${response.status})`);
      }

      alert("Thank you. I will get back to you as soon as possible.");
      setForm(INITIAL_STATE);
    } catch (error) {
      console.log(error);
      alert(
        `Something went wrong. You can also email me directly at ${config.html.email}.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 flex-[0.75] rounded-2xl p-8"
      >
        <Header useMotion={false} {...config.contact} />

        <form
          // @ts-expect-error
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {Object.keys(config.contact.form).map((input) => {
            const { span, placeholder } =
              config.contact.form[input as keyof typeof config.contact.form];
            const Component = input === "message" ? "textarea" : "input";

            return (
              <label key={input} className="flex flex-col">
                <span className="mb-4 font-medium text-white">{span}</span>
                <Component
                  type={input === "email" ? "email" : "text"}
                  name={input}
                  value={form[`${input}`]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
                  {...(input === "message" && { rows: 7 })}
                />
              </label>
            );
          })}
          <button
            type="submit"
            disabled={loading}
            className="bg-tertiary shadow-primary w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        <div className="mt-12">
          <p className="text-secondary text-[14px] uppercase tracking-wider">
            Find me on
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href={config.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={socialLinkClass}
            >
              <img
                src={github}
                alt="GitHub"
                className="h-1/2 w-1/2 object-contain"
              />
            </a>
            <a
              href={config.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={socialLinkClass}
            >
              <LinkedInIcon className="h-1/2 w-1/2" />
            </a>
            <a
              href={config.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialLinkClass}
            >
              <InstagramIcon className="h-1/2 w-1/2" />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
