const List = ({ hospitals = [], setCenter, coordinates = [] }) => {
  return (
    <div className="w-full max-w-md lg:w-[300px] overflow-y-scroll ">
      {hospitals.map((hospital, index) => (
        <div
          key={index}
          className="p-2 sm:p-4 border-b border-gray-200 cursor-pointer"
          onClick={() => {
            const coord = coordinates.find((c) => c.hospital === hospital);
            if (coord) {
              setCenter({ lat: coord.lat, lng: coord.lng });
            }
          }}
        >
          <h3 className="text-base sm:text-lg font-bold">{hospital.name}</h3>
          <p className="text-sm sm:text-base">{hospital.address}</p>
          <p className="text-sm sm:text-base">{hospital.treatedAnimals}</p>
          <p className="text-sm sm:text-base">{hospital.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
