import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useRenderProductData } from "../../../context/product-context";
import { useRenderPagination } from "../../../context/pagination-context";
import _ from "lodash";
import { Paper, Stack, Typography, TextField } from "@mui/material";

export default function ModelOptionsFilter() {
  const { resDataAllProduct, setResDataAllFilterProduct} = useRenderProductData();
  const { setCurrentPage } = useRenderPagination();
  

  const allModels = _.uniq(resDataAllProduct?.map((item) => item.model));

  const [selectedModels, setSelectedModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleModelChange = (model) => {
    const updatedModels = selectedModels?.includes(model)
      ? selectedModels.filter((selectedModel) => selectedModel !== model)
      : [...selectedModels, model];

    setSelectedModels(updatedModels);

    if (updatedModels.length === 0) {
      // Hiçbir seçenek seçilmediğinde, orijinal veriyi geri yükle
      setResDataAllFilterProduct(resDataAllProduct);
    } else {
      // Seçilen modellere göre filtreleme yap
      const filteredProducts = resDataAllProduct.filter((product) =>
        updatedModels.includes(product.model)
      );
      setResDataAllFilterProduct(filteredProducts);
    }
    // Sayfa numarasını sıfırla
    setCurrentPage(1);
  };

  const filteredModels = allModels.filter((model) =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1">Models</Typography>
      <TextField
        label="Search Models"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Paper elevation={3} variant="elevation" sx={{ height: 180, overflow: "auto" }}>
        <FormGroup>
          {filteredModels.map((model) => (
            <FormControlLabel
              key={model}
              control={
                <Checkbox
                  checked={selectedModels?.includes(model)}
                  onChange={() => handleModelChange(model)}
                />
              }
              label={model}
            />
          ))}
        </FormGroup>
      </Paper>
    </Stack>
  );
}
