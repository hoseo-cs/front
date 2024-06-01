const List = ({ hospitals = [], setCenter, coordinates = [] }) => {
  return (
    <div className="w-[300px] overflow-y-scroll">
      {hospitals.map((hospital, index) => (
        <div
          key={index}
          className="p-4 border-b border-gray-200 cursor-pointer"
          onClick={() => {
            const coord = coordinates.find((c) => c.hospital === hospital);
            if (coord) {
              setCenter({ lat: coord.lat, lng: coord.lng });
            }
          }}
        >
          <h3 className="text-lg font-bold">{hospital.name}</h3>
          <p>{hospital.address}</p>
          <p>{hospital.treatedAnimals}</p>
          <p>{hospital.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
