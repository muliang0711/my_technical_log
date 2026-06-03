const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function ContributionGraph({ activity }) {
  const contributionLabel = activity.total === 1 ? "contribution" : "contributions";

  return (
    <section className="activity-section">
      <div className="container">
        <div className="activity-layout">
          <div className="activity-main">
            <div className="activity-heading">
              <h2>{activity.total} {contributionLabel} in 2026</h2>
            </div>
            <div className="activity-card">
              <div className="activity-months" aria-hidden="true">
                {activity.monthLabels.map((month) => (
                  <span
                    className="activity-month"
                    key={month.label}
                    style={{ gridColumnStart: month.column + 1 }}
                  >
                    {month.label}
                  </span>
                ))}
              </div>
              <div className="activity-grid-wrap">
                <div className="activity-days" aria-hidden="true">
                  {dayLabels.map((label, index) => (
                    <span key={`${label}-${index}`}>{label}</span>
                  ))}
                </div>
                <div className="activity-grid" aria-label="Contribution activity by week">
                  {activity.cells.map((cell) => (
                    <span
                      className={`activity-cell activity-cell--${cell.level}`}
                      key={cell.key}
                      title={`${cell.date}: ${cell.count} ${cell.count === 1 ? "contribution" : "contributions"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="activity-footer">
                <div className="activity-legend" aria-label="Contribution intensity legend">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span className={`activity-cell activity-cell--${level}`} key={level} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
          <div className="activity-years" aria-label="Contribution years">
            {activity.years.map((year, index) => (
              <button
                className={index === 0 ? "activity-year activity-year--active" : "activity-year"}
                key={year}
                type="button"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
