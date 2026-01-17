const tarotCards = [
  {
    name: "愚人",
    upright: {
      love: "新的关系或阶段正在展开，保持开放。",
      career: "勇敢尝试新的方向。",
      healing: "允许自己重新开始。",
      energy: "今天充满可能性。"
    },
    reversed: {
      love: "你可能在逃避真正的感受。",
      career: "冲动或犹豫正在阻碍你。",
      healing: "需要更多安全感。",
      energy: "能量有些分散。"
    }
  },
  {
    name: "女祭司",
    upright: {
      love: "倾听你内在真正的声音。",
      career: "现在适合观察与准备。",
      healing: "直觉正在疗愈你。",
      energy: "安静是今天的主题。"
    },
    reversed: {
      love: "你忽视了自己的直觉。",
      career: "信息不透明，暂缓决定。",
      healing: "你需要更诚实地面对内心。",
      energy: "内在有些混乱。"
    }
  },
  {
    name: "太阳",
    upright: {
      love: "关系中充满温暖与信任。",
      career: "你的努力正在被看见。",
      healing: "喜悦本身就是疗愈。",
      energy: "今天适合行动与表达。"
    },
    reversed: {
      love: "快乐被暂时遮挡。",
      career: "信心不足影响发挥。",
      healing: "你需要重新连接喜悦。",
      energy: "能量略显低落。"
    }
  }
];

const drawBtn = document.getElementById("drawBtn");
const cardsDiv = document.getElementById("cards");

/* 每日限制逻辑 */
function canDrawToday() {
  const lastDrawDate = localStorage.getItem("lastTarotDate");
  const today = new Date().toDateString();
  return lastDrawDate !== today;
}

function markDrawnToday() {
  const today = new Date().toDateString();
  localStorage.setItem("lastTarotDate", today);
}

/* 抽牌逻辑 */
drawBtn.addEventListener("click", () => {
  if (!canDrawToday()) {
    alert("你今天已经抽过牌了，请明天再来 🌙");
    return;
  }

  const type = document.getElementById("questionType").value;
  cardsDiv.innerHTML = "";

  const selected = [];

  while (selected.length < 3) {
    const index = Math.floor(Math.random() * tarotCards.length);
    const card = tarotCards[index];
    if (!selected.includes(card)) {
      selected.push(card);
    }
  }

  selected.forEach(card => {
    const isUpright = Math.random() > 0.5;
    const position = isUpright ? "正位" : "逆位";
    const meaning = isUpright
      ? card.upright[type]
      : card.reversed[type];

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${card.name} · ${position}</h3>
      <p>${meaning}</p>
    `;
    cardsDiv.appendChild(div);
  });

  markDrawnToday();
});
