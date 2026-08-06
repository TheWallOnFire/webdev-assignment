# API Specifications

This document outlines the REST API endpoints required for the application. All API responses should follow a standard JSON format and include standard HTTP status codes.

## Base URL
`http://localhost:3000/api/v1`

---

## 1. Score Checker
Retrieves the exam scores for a specific student based on their Registration Number (SBD).

- **URL:** `/scores/:sbd`
- **Method:** `GET`
- **URL Params:** 
  - `sbd` (string) - The unique Registration Number of the student.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "status": "success",
      "data": {
        "sbd": "01000001",
        "toan": 8.4,
        "ngu_van": 6.75,
        "ngoai_ngu": 8.0,
        "vat_li": 6.0,
        "hoa_hoc": 5.25,
        "sinh_hoc": 5.0,
        "lich_su": null,
        "dia_li": null,
        "gdcd": null,
        "ma_ngoai_ngu": "N1"
      }
    }
    ```
- **Error Response:**
  - **Code:** 404 Not Found
  - **Content:** `{ "status": "error", "message": "Student not found" }`

---

## 2. Top 10 Group A Students
Retrieves the top 10 students with the highest total scores in Group A (Toán, Vật lí, Hóa học).

- **URL:** `/reports/top-group-a`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "status": "success",
      "data": [
        {
          "sbd": "01000005",
          "toan": 9.0,
          "vat_li": 9.5,
          "hoa_hoc": 9.0,
          "total_score": 27.5
        },
        // ... up to 10 records
      ]
    }
    ```

---

## 3. Score Reporting Summary
Provides a summary report showing the distribution of scores (e.g., number of students at each score level per subject).

- **URL:** `/reports/score-distribution`
- **Method:** `GET`
- **Query Params (Optional):** 
  - `subject` (string) - Filter by a specific subject (e.g., `toan`, `ngu_van`).
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "status": "success",
      "data": {
        "toan": {
          ">=8": 1500,
          "6-8": 3000,
          "4-6": 2000,
          "<4": 500
        },
        "ngu_van": {
          // ...
        }
      }
    }
    ```
