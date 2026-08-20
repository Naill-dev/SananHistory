const historyQuizData = [
  {
    id: 1,
    category: "Azərbaycan Tarixi (Qədim Dövr)",
    question: "Manna dövlətinin mərkəzləşdirilməsində və qüdrətlənməsində ən böyük rol oynamış hökmdar kimdir?",
    options: [
      "İranzu",
      "Ullusunu",
      "Aza",
      "Ahşeri"
    ],
    correct: 0,
    explanation: "İranzu Manna dövlətini mərkəzləşdirən və canişinlik sistemi yaradan ən qüdrətli hökmdar olmuşdur."
  },
  {
    id: 2,
    category: "Azərbaycan Tarixi (Orta Əsrlər)",
    question: "1514-cü il Çaldıran döyüşünün nəticəsi və tarixi əhəmiyyəti haqqında hansı fikir doğrudur?",
    options: [
      "Səfəvilər qəti qələbə qazanaraq bütün Anadoluya nəzarəti ələ keçirdi.",
      "Osmanlı ordusu odlu silahların üstünlüyü ilə qalib gəldi, lakin Səfəvi dövləti müstəqilliyini qorudu.",
      "Tərəflər arasında Amasya sülh müqaviləsi imzalandı.",
      "Şirvanşahlar dövləti tamamilə süqut etdi."
    ],
    correct: 1,
    explanation: "Çaldıran döyüşündə I Sultan Səlimin odlu silah üstünlüyü ilə Osmanlı qalib gəlsə də, Səfəvilər dövləti öz mövcudluğunu qoruyub saxladı."
  },
  {
    id: 3,
    category: "Azərbaycan Tarixi (Xanlıqlar Dövrü)",
    question: "Qarabağ xanlığının əsasını kim qoymuş və Şuşa (Pənahabad) qalası hansı ildə inşa edilmişdir?",
    options: [
      "İbrahimxəlil xan / 1763-cü il",
      "Pənahəli xan / 1752-ci il",
      "Cavad xan / 1747-ci il",
      "Fətəli xan / 1780-ci il"
    ],
    correct: 1,
    explanation: "Qarabağ xanlığının banisi Pənahəli xan Cavanşir olmuşdur. Şuşa qalası strateji məqsədlə 1752-ci ildə inşa edilmişdir."
  },
  {
    id: 4,
    category: "Cümhuriyyət Dövrü (AXC)",
    question: "Azərbaycan Xalq Cümhuriyyətinin İstiqlal Bəyannaməsi harada qəbul edilmişdir?",
    options: [
      "Bakıda",
      "Gəncədə",
      "Tiflisdə",
      "Naxçıvanda"
    ],
    correct: 2,
    explanation: "28 May 1918-ci ildə Tiflis şəhərində Milli Şura tərəfindən İstiqlal Bəyannaməsi qəbul edilmişdir."
  },
  {
    id: 5,
    category: "Müasir Dövr və Zəfər Tarixi",
    question: "2020-ci il 44 günlük Vətən Müharibəsində Şuşa şəhəri hansı tarixdə azad edilmişdir?",
    options: [
      "27 Sentyabr 2020",
      "8 Noyabr 2020",
      "10 Noyabr 2020",
      "1 Dekabr 2020"
    ],
    correct: 1,
    explanation: "8 Noyabr 2020-ci il tarixində Şuşa şəhəri işğaldan azad edildi və bu gün Zəfər Günü kimi qeyd olunur."
  }
];

function getQuizRecommendation(score, total) {
  const percentage = (score / total) * 100;
  
  if (percentage === 100) {
    return {
      title: "Əla Nəticə! Təməl Bilikləriniz Çox Yaxşıdır",
      badge: "Yüksək Səviyyə",
      badgeColor: "bg-emerald-900/30 text-emerald-300 border-emerald-500/40",
      description: "Tarix üzrə təməl bilikləriniz möhkəmdir. İmtahanlarda ən yüksək nəticəni toplamaq və ya olimpiada/MİQ mərhələsində uğur qazanmaq üçün dərinləşdirilmiş proqramımız sizin üçün idealdır.",
      serviceRecommended: "Dərinləşdirilmiş Hazırlıq Qrupu"
    };
  } else if (percentage >= 60) {
    return {
      title: "Yaxşı Başlanğıc! Bəzi Mövzuların Təkrara Ehtiyacı Var",
      badge: "Orta Səviyyə",
      badgeColor: "bg-amber-900/30 text-amber-300 border-amber-500/40",
      description: "Ümumi təməliniz yaxşıdır, lakin xronologiya və xəritə üzrə bəzi detalları möhkəmləndirmək faydalı olar. Sistemli dərslərimizlə bu boşluqları qısa müddətdə aradan qaldıra bilərsiniz.",
      serviceRecommended: "Standart Hazırlıq Proqramı"
    };
  } else {
    return {
      title: "Təməli Birlikdə Sıfırdan Qura Bilərik",
      badge: "Təməl Səviyyə",
      badgeColor: "bg-orange-900/30 text-orange-300 border-orange-500/40",
      description: "Tarixi hadisələri əzbərləmədən, səbəb-nəticə əlaqəsi və vizual materiallarla öyrəndikdə mövzuları daha rahat və yadda qalan şəkildə mənimsəyəcəksiniz.",
      serviceRecommended: "Təkmilləşdirmə və Təməl Proqramı"
    };
  }
}
