const parseAddressResponse = (response) => {
  const parsedItems = [];

  // eslint-disable-next-line
  // Response format: Nimi	Katuosoite	Postinumero	Postitoimipaikka	Puhelinjafaksi	Sähköpostiosoite	Myymäläpäällikkö	Aukioloaika:ma	Aukioloaika:ti	Aukioloaika:ke	Aukioloaika:to	Aukioloaika:pe	Aukioloaika:la	Numero	Lisätiedot
  // Actual contents of file response from line 4
  // TODO: error handling for unexpected response...

  const lines = response.split('\n');
  for (let i = 3; i < lines.length; i++) {
    const parsedLine = lines[i].split('\t');
    if (parsedLine.length === 15) {
      const parsed = {
        streetAddress: parsedLine[1],
        zipCode: parsedLine[2],
        postOffice: parsedLine[3],
        storeNumber: parsedLine[13],
      };
      parsedItems.push(parsed);
    }
  }
  return parsedItems;
};

exports.parseAddressResponse = parseAddressResponse;
