import { Router, type IRouter } from "express";
import {
  BlockUserBody,
  GetMatchMessagesParams,
  ReportUserBody,
  SendMatchMessageBody,
  SendMatchMessageParams,
  StartMatchmakingBody,
  UpdateProfileBody,
} from "@workspace/api-zod";

const router: IRouter = Router();
const now = () => new Date().toISOString();
const me = "demo-user";
const profile = {
  id: me,
  displayName: "Aarav",
  username: "aarav.world",
  avatarUrl: null,
  country: "India",
  languagesSpoken: ["English", "Hindi"],
  languagesLearning: ["Japanese"],
  interests: ["Travel", "Music", "Technology"],
  bio: "Curious about people, places, and the stories that connect us.",
  status: "active",
  lastActiveAt: now(),
};
const partner = {
  id: "partner-maya",
  displayName: "Maya",
  username: "maya.talks",
  avatarUrl: null,
  country: "Japan",
  languagesSpoken: ["Japanese", "English"],
  languagesLearning: ["Hindi"],
  interests: ["Travel", "Music", "Culture"],
  bio: "Collector of local recipes and good questions.",
  status: "active",
  lastActiveAt: now(),
};
let matchStatus: "idle" | "searching" | "found" | "connected" = "idle";
let matchId = "match-demo-01";
let messages = [
  { id: "msg-1", senderId: partner.id, message: "Hi! What is a place in India I should visit?", createdAt: now() },
];
const blockedUsers: Array<{ userId: string; displayName: string; country: string; blockedAt: string }> = [];

router.get("/app", (_req, res) => res.json({
  profile,
  stats: { conversations: 12, countries: 8, minutes: 186 },
  activeMatch: matchStatus === "connected" ? { matchId, partner, prompt: "What food should everyone try in your country?", connectedAt: now() } : null,
  notifications: [{ id: "n-1", title: "Your profile is ready", message: "Choose a mode and start a conversation.", createdAt: now(), read: false }],
}));

router.patch("/app/profile", (req, res) => {
  const data = UpdateProfileBody.parse(req.body);
  Object.assign(profile, data);
  res.json(profile);
});

router.get("/discover", (_req, res) => res.json({
  headline: "A bigger world starts with one hello.",
  countries: [
    { code: "IN", name: "India", flag: "IN", conversationCount: 284, description: "Stories, street food, and a billion perspectives." },
    { code: "JP", name: "Japan", flag: "JP", conversationCount: 192, description: "A thoughtful exchange across old and new." },
    { code: "BR", name: "Brazil", flag: "BR", conversationCount: 164, description: "Music, movement, and warm welcomes." },
    { code: "DE", name: "Germany", flag: "DE", conversationCount: 138, description: "Curious conversations with a clear point of view." },
    { code: "FR", name: "France", flag: "FR", conversationCount: 117, description: "Culture, cinema, and everyday rituals." },
    { code: "KR", name: "South Korea", flag: "KR", conversationCount: 101, description: "Ideas and inspiration from Seoul to Busan." },
  ],
  interests: ["Travel", "Music", "Culture", "Gaming", "Food", "Technology", "Movies", "Languages"],
}));

router.get("/history", (_req, res) => res.json([
  { id: "h-1", date: "2026-08-21", country: "Brazil", durationMinutes: 14, interests: ["Music", "Travel"], partnerName: "Lucas", hidden: false },
  { id: "h-2", date: "2026-08-19", country: "Germany", durationMinutes: 8, interests: ["Technology"], partnerName: "Nina", hidden: false },
  { id: "h-3", date: "2026-08-17", country: "France", durationMinutes: 22, interests: ["Food", "Culture"], partnerName: "Amélie", hidden: false },
]));

router.post("/matchmaking", (req, res) => {
  StartMatchmakingBody.parse(req.body);
  matchStatus = "found";
  res.json({ status: matchStatus, matchId, partner, prompt: "What food should everyone try in your country?", queuePosition: null });
});
router.delete("/matchmaking", (_req, res) => { matchStatus = "idle"; res.status(204).send(); });
router.get("/matchmaking/status", (_req, res) => res.json({ status: matchStatus, matchId: matchStatus === "idle" ? null : matchId, partner: matchStatus === "idle" ? null : partner, prompt: matchStatus === "idle" ? null : "What food should everyone try in your country?", queuePosition: matchStatus === "searching" ? 2 : null }));

router.get("/matches/:matchId/messages", (req, res) => {
  GetMatchMessagesParams.parse(req.params);
  res.json(messages);
});
router.post("/matches/:matchId/messages", (req, res) => {
  SendMatchMessageParams.parse(req.params);
  const data = SendMatchMessageBody.parse(req.body);
  const message = { id: `msg-${messages.length + 1}`, senderId: me, message: data.message.trim(), createdAt: now() };
  messages = [...messages, message];
  res.status(201).json(message);
});
router.post("/matches/:matchId/next", (_req, res) => {
  matchId = `match-demo-${Date.now()}`;
  matchStatus = "found";
  res.json({ status: "found", matchId, partner, prompt: "What hobby do you wish you had more time for?", queuePosition: null });
});
router.post("/matches/:matchId/end", (_req, res) => {
  matchStatus = "idle";
  res.json({ id: "history-new", date: now().slice(0, 10), country: partner.country, durationMinutes: 1, interests: partner.interests.slice(0, 2), partnerName: partner.displayName, hidden: false });
});
router.post("/matches/:matchId/report", (req, res) => {
  const data = ReportUserBody.parse(req.body);
  res.status(201).json({ id: "report-new", reason: data.reason, status: "pending", createdAt: now() });
});
router.get("/blocks", (_req, res) => res.json(blockedUsers));
router.post("/blocks", (req, res) => {
  const data = BlockUserBody.parse(req.body);
  const item = { userId: data.userId, displayName: partner.displayName, country: partner.country, blockedAt: now() };
  blockedUsers.push(item);
  matchStatus = "idle";
  res.status(201).json(item);
});
router.delete("/blocks/:userId", (req, res) => {
  const index = blockedUsers.findIndex((item) => item.userId === req.params.userId);
  if (index >= 0) blockedUsers.splice(index, 1);
  res.status(204).send();
});

export default router;