const WA = "972504744815";

/** Scripted WhatsApp salon bot, embedded from the unchanged static demo. */
export default function SalonBotDemo({ waMsg }: { waMsg: string }) {
  const href = `https://wa.me/${WA}?text=${encodeURIComponent(waMsg)}`;

  return (
    <section className="service-section sp-section salon-demo" aria-labelledby="salon-demo-title">
      <h2 id="salon-demo-title" className="sp-h2">נסו בעצמכם: ככה בוט עובד בעסק</h2>
      <p className="salon-demo-sub">
        הדגמה חיה של בוט למספרה: קביעת תורים, התאמת טיפול, שאלות נפוצות ועוד. לחצו ותראו איך הוא עונה.
      </p>
      <div className="salon-demo-frame">
        <iframe
          className="salon-demo-iframe"
          src="/demo/salon-bot/index.html"
          title="דמו צ'אטבוט מספרה"
          loading="lazy"
        />
      </div>
      <div className="sp-actions salon-demo-cta">
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          רוצים בוט כזה לעסק שלכם?
        </a>
      </div>
    </section>
  );
}
