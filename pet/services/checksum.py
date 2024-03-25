class TemperatureCheckSumService:
    def __init__(self, password, serial_number):
        self.password = password
        self.serial_number = serial_number

    @staticmethod
    def _convert_string_list_to_ascii(_list: list[str]) -> list:
        # Convert String list to ascii values
        # using list comprehension + ord()
        ascii_list = [ord(char) for char in _list]
        return ascii_list

    def _generate_checksum(self) -> str:
        return self.serial_number[-5:]

    def check(self) -> bool:
        result = self._generate_checksum()
        print(result)
        print(self.password)
       
        return result == self.password
