const List = ({ hospitals = [], setCenter, coordinates = [] }) => {
  return (
    <div className="h-full overflow-y-auto border-r border-gray-300 bg-white shadow-lg">
      {hospitals.map((hospital, index) => (
        <div
          key={index}
          className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={() => {
            const coord = coordinates.find((c) => c.hospital === hospital);
            if (coord) {
              setCenter({ lat: coord.lat, lng: coord.lng });
            }
          }}
        >
          <h3 className="text-lg font-semibold">{hospital.name}</h3>
          <p className="text-sm text-gray-600">{hospital.address}</p>
          <p className="text-sm text-gray-600">{hospital.treatedAnimals}</p>
          <p className="text-sm text-gray-600">{hospital.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
