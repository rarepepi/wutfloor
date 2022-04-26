export default function NFTCollectionsTableHead({ onSortBy }) {
  return <thead className="rounded-t-2xl bg-bg-light text-left  h-12">
    <tr className="text-white">
      <th className="p-6 cursor-pointer" onClick={() => onSortBy("name")}>
        Collection
      </th>
      <th
        className="p-6 cursor-pointer"
        onClick={() => onSortBy("stats.floor_price")}
      >
        Floor
      </th>
      <th
        className="p-6 cursor-pointer"
        onClick={() => onSortBy("stats.average_price")}
      >
        Avg
      </th>
      <th
        className="p-6 cursor-pointer"
        onClick={() => onSortBy("stats.one_day_volume")}
      >
        1D Vol
      </th>
      <th
        className="p-6 cursor-pointer"
        onClick={() => onSortBy("stats.one_day_sales")}
      >
        1D Sales
      </th>
      <th
        className="p-6 cursor-pointer"
        onClick={() => onSortBy("avg_price_market_cap")}
      >
        Market Cap
      </th>
      <th
        className="p-6 cursor-pointer"
        onClick={() => onSortBy("stats.one_day_change")}
      >
        1D Δ(+/-%)
      </th>
    </tr>
  </thead>;
}
