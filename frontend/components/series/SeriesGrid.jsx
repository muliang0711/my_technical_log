import SeriesCard from "./SeriesCard";

export default function SeriesGrid({ series }) {
  return (
    <div className="grid grid--2">
      {series.map((item) => (
        <SeriesCard key={item.slug} series={item} />
      ))}
    </div>
  );
}
