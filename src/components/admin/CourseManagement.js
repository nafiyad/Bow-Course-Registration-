import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function CourseManagement() {
  const { 
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    programs
  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    term: '',
    program: '',
    description: ''
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Filter courses based on search term, selected term, and program
  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      (selectedTerm === '' || course.term === selectedTerm) &&
      (selectedProgram === '' || course.program === selectedProgram) &&
      (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [courses, selectedTerm, selectedProgram, searchTerm]);

  // Handle input changes for new or edited course
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCourse) {
      setEditingCourse({ ...editingCourse, [name]: value });
    } else {
      setNewCourse({ ...newCourse, [name]: value });
    }
  };

  // Add a new course
  const handleAddCourse = () => {
    const result = addCourse(newCourse);
    if (result.success) {
      setOpenDialog(false);
      setNewCourse({
        code: '',
        name: '',
        term: '',
        program: '',
        description: ''
      });
    }
  };

  // Update an existing course
  const handleUpdateCourse = () => {
    const result = updateCourse(editingCourse);
    if (result.success) {
      setEditingCourse(null);
      setOpenDialog(false);
    }
  };

  // Delete a course
  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
    }
  };

  // Open dialog for adding or editing a course
  const handleOpenDialog = (course = null) => {
    setEditingCourse(course);
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setEditingCourse(null);
    setOpenDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Course Management</Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Term"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <MenuItem value="">All Terms</MenuItem>
            <MenuItem value="Winter">Winter</MenuItem>
            <MenuItem value="Spring">Spring</MenuItem>
            <MenuItem value="Summer">Summer</MenuItem>
            <MenuItem value="Fall">Fall</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <MenuItem value="">All Programs</MenuItem>
            {programs.map(program => (
              <MenuItem key={program.code} value={program.code}>{program.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Course
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Term</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.term}</TableCell>
                <TableCell>{course.program}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(course)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCourse(course.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ '& .MuiTextField-root': { my: 1 } }}>
            <TextField
              fullWidth
              label="Course Name"
              name="name"
              value={editingCourse ? editingCourse.name : newCourse.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Course Code"
              name="code"
              value={editingCourse ? editingCourse.code : newCourse.code}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              select
              label="Term"
              name="term"
              value={editingCourse ? editingCourse.term : newCourse.term}
              onChange={handleInputChange}
            >
              <MenuItem value="Winter">Winter</MenuItem>
              <MenuItem value="Spring">Spring</MenuItem>
              <MenuItem value="Summer">Summer</MenuItem>
              <MenuItem value="Fall">Fall</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              label="Program"
              name="program"
              value={editingCourse ? editingCourse.program : newCourse.program}
              onChange={handleInputChange}
            >
              {programs.map(program => (
                <MenuItem key={program.code} value={program.code}>{program.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={editingCourse ? editingCourse.description : newCourse.description}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={editingCourse ? handleUpdateCourse : handleAddCourse} variant="contained" color="primary">
            {editingCourse ? 'Update' : 'Add'} Course
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default CourseManagement;
