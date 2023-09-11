class TemperatureCheckSumService:
    def __init__(self, password, temperature, serial_number):
        self.password = password
        self.temperature = temperature
        self.serial_number = serial_number

    @staticmethod
    def _convert_string_list_to_ascii(_list: list[str]) -> list:
        # Convert String list to ascii values
        # using list comprehension + ord()
        ascii_list = [ord(char) for char in _list]
        return ascii_list

    def _generate_checksum(self) -> str:
        # initialize list
        temperature_list = list(self.temperature)
        temperature_list.remove('.') if '.' in temperature_list else None
        serial_number_list = list(self.serial_number)[-5:]

        temp_ascii = self._convert_string_list_to_ascii(temperature_list)
        sn_ascii = self._convert_string_list_to_ascii(serial_number_list)

        result = ''

        for i in range(len(temp_ascii)):
            result += str(temp_ascii[i] ^ sn_ascii[i])
        return result

    def check(self) -> bool:
        result = self._generate_checksum()
        print(result)
        print(self.password)
        return result == self.password
