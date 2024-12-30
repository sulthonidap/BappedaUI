import {
  Search,
  Plus,
  Bike,
  Printer,
  Mail,
  CheckIcon,
  Upload,
  PenSquare,
} from "lucide-react";
import {
  Alert,
  Button,
  Paper,
  ClickAwayListener,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


type Letter = {
  ID: number
  plateNo: string
  VehicleType: string
  name: string
  address: string
  timePeriod: string
};

export default function Surat() {
  const [showAlert, setShowAlert] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [letter, setLetter] = useState<Letter[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state


  useEffect(() => {
    axios
      .get<{ data: Letter[] }>(API_BASE_URL + '/listletter') // Adjust based on API structure
      .then(response => {
        console.log('API Response:', response.data); // Debug response
        setLetter(response.data.data || []); // Ensure data is an array
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      })
      .finally(() => setLoading(false)); // End loading state
  }, []);

  console.log(letter)

  const handleMailClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleClickAway = () => {
    setShowDropdown(false);
  };
  const handleDialogOpen = () => {
    setOpenDialog(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div
            className="fixed top-4 right-4 z-[9999]"
            style={{ minHeight: "60px" }}
          >
            {showAlert && (
              <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity="success"
                variant="filled"
                className="shadow-lg"
                sx={{ minWidth: "300px" }}
              >
                Item Berhasil dikirim ke KirimDokumen
              </Alert>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center lg:mt-14">
              <h1 className="text-2xl font-semibold">Surat</h1>
              <div className="relative">
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      Tambah Surat
                      <Plus className="h-5 w-5" />
                      {/* <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} /> */}
                    </button>

                    {showDropdown && (
                      <Paper className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                            onClick={() => {
                              // Handle manual input
                              handleDialogOpen();
                              setShowDropdown(false);
                            }}
                          >
                            <PenSquare className="h-4 w-4" />
                            Manual Input
                          </button>
                          <label className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                            <Upload className="h-4 w-4" />
                            Excel Upload
                            <input
                              type="file"
                              accept=".xlsx, .xls"
                              className="hidden"
                              onChange={(e) => {
                                // Handle file upload
                                const file = e.target.files?.[0];
                                if (file) {
                                  // Process the file
                                  console.log(file);
                                }
                                setShowDropdown(false);
                              }}
                            />
                          </label>
                        </div>
                      </Paper>
                    )}
                  </div>
                </ClickAwayListener>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plat Nomer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipe Kendaraan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Masa Berlaku
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Pemilik
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alamat
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap relative text-center">
                        <span className="text-sm text-gray-900 absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 space-x-2"></span>
                      </td>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {letter.map((user) => (
                      <tr key={user.plateNo} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {user.plateNo}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <Bike className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.VehicleType}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {user.timePeriod}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{user.name}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {user.address}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap relative text-center">
                          <span className="text-sm text-gray-900 absolute top-0 left-1 transform -translate-x-1/2 mt-4 space-x-2">
                            <Button
                              className="flex items-center gap-2"
                              variant="contained"
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button
                              className="flex items-center gap-2"
                              variant="contained"
                              color="warning"
                              onClick={handleMailClick}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
              <DialogTitle>Tambahkan Manual</DialogTitle>
              <DialogContent>
                <div className="flex w-full items-center gap-4 mb-4">
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="plateNo"
                    name="plateNo"
                    label="PLAT NOMER"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="vehicle-type-label">Tipe Kendaraan</InputLabel>
                    <Select
                      labelId="vehicle-type-label"
                      id="vehicle-type"
                      value={""}
                      label="Tipe Kendaraan"
                    // onChange={''}
                    >
                      <MenuItem value={"Roda 2"}>Roda 2</MenuItem>
                      <MenuItem value={"Roda 4"}>Roda 4</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <InputLabel>Masa Berlaku</InputLabel>
                <TextField
                  required
                  margin="dense"
                  id="timePeriod"
                  name="timePeriod"
                  type="date"
                  fullWidth
                  variant="standard"
                />

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="email"
                  label="NAMA PEMILIK"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="email"
                  label="ALAMAT"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">Proses</Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
}
