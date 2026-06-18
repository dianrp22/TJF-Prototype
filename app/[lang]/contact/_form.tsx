"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, Clock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Props {
  tr: {
    contactInfoTitle: string;
    contactLabels: { generalEmail: string; partnerEmail: string; address: string; response: string };
    opportunitiesTitle: string;
    collabTypes: readonly string[];
    send: string;
    name: string;
    namePlaceholder: string;
    organization: string;
    orgPlaceholder: string;
    email: string;
    collabType: string;
    collabTypePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    successBtn: string;
  };
  lang: string;
}

export default function ContactForm({ tr, lang }: Props) {
  const contactInfo = [
    { icon: Mail,   label: tr.contactLabels.generalEmail, value: "info@tayjuhanafoundation.org" },
    { icon: Mail,   label: tr.contactLabels.partnerEmail,  value: "partnership@tayjuhanafoundation.org" },
    { icon: MapPin, label: tr.contactLabels.address,       value: "Jakarta, Indonesia" },
    { icon: Clock,  label: tr.contactLabels.response,      value: lang === "en" ? "3–5 business days" : "3–5 hari kerja" },
  ];

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", email: "", type: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Sidebar info */}
        <div className="lg:col-span-2 space-y-5">
          <AnimatedSection direction="left">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h2 className="font-black text-gray-900 mb-5">{tr.contactInfoTitle}</h2>
              <ul className="space-y-4">
                {contactInfo.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label} className="flex gap-3">
                      <div className="w-9 h-9 bg-tjf-blue-pale rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-tjf-blue" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{c.label}</p>
                        <p className="text-sm text-gray-700 font-semibold">{c.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.1}>
            <div className="bg-tjf-blue-pale border border-blue-100 rounded-2xl p-6">
              <h3 className="font-black text-gray-900 mb-3 text-sm">{tr.opportunitiesTitle}</h3>
              <ul className="space-y-2">
                {tr.collabTypes.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-tjf-blue rounded-full flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.2}>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-5">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl">📋</span>
                <h3 className="font-black text-gray-900 text-sm">Pengajuan Proposal Website</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                Subject: <span className="font-bold text-gray-700">[Nama Org] – TJF Website Refreshment 2026</span>
              </p>
              <p className="text-xs text-gray-500">Kirim ke: <span className="font-semibold text-gray-700">dinda@tayjuhanafoundation.org</span></p>
              <p className="text-xs text-gray-400 mt-0.5">CC: regia@tayjuhanafoundation.org</p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-xs text-red-600 font-black">Batas: 19 Juni 2026 · 23.59 WIB</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <AnimatedSection direction="right">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-3xl p-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-16 h-16 text-tjf-green mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{tr.successTitle}</h3>
                  <p className="text-gray-500 text-sm mb-6">{tr.successDesc}</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", org: "", email: "", type: "", message: "" }); }}
                    className="text-sm text-tjf-green font-bold hover:underline"
                  >
                    {tr.successBtn} →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-gray-100 rounded-3xl p-8 shadow-card space-y-5"
                >
                  <h2 className="text-xl font-black text-gray-900">{tr.send}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{tr.name} *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-tjf-blue/20 focus:border-tjf-blue transition-all"
                        placeholder={tr.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{tr.organization}</label>
                      <input
                        value={form.org}
                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-tjf-blue/20 focus:border-tjf-blue transition-all"
                        placeholder={tr.orgPlaceholder}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{tr.email} *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-tjf-blue/20 focus:border-tjf-blue transition-all"
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{tr.collabType}</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-tjf-blue/20 focus:border-tjf-blue transition-all text-gray-700 bg-white"
                    >
                      <option value="">{tr.collabTypePlaceholder}</option>
                      {tr.collabTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{tr.message} *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-tjf-blue/20 focus:border-tjf-blue transition-all resize-none"
                      placeholder={tr.messagePlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-tjf-blue to-tjf-blue-light text-white font-bold py-3 rounded-xl hover:shadow-glow-blue transition-all duration-300 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {tr.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {tr.send}
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
